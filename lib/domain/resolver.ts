import { supabase } from '@/lib/supabase/server';

interface Vendor {
  id: string;
  name: string;
  domain: string;
  slug: string;
  logo_url?: string;
  theme_config?: any;
  status: 'active' | 'inactive' | 'suspended';
}

// Cache for vendor lookups
const vendorCache = new Map<string, Vendor>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Get vendor by domain name
 * This is the CORE function that determines whether we're on a vendor store or marketplace
 */
export async function getVendorByDomain(domain: string): Promise<Vendor | null> {
  // Clean the domain
  const cleanDomain = cleanDomainString(domain);
  
  // Check cache first
  const cached = vendorCache.get(cleanDomain);
  if (cached && Date.now() - (cached as any).timestamp < CACHE_TTL) {
    return cached;
  }

  try {
    // Query the vendors table
    const { data, error } = await supabase
      .from('vendors')
      .select('*')
      .or(`domain.eq.${cleanDomain},domain.eq.www.${cleanDomain}`)
      .eq('status', 'active')
      .single();

    if (error) {
      // If no vendor found with exact domain, check for subdomain pattern
      if (error.code === 'PGRST116') {
        // Check if it's a subdomain like electric.supermart.com
        if (cleanDomain.includes('.supermart.com')) {
          const slug = cleanDomain.split('.')[0];
          return await getVendorBySlug(slug);
        }
      }
      console.error('Error fetching vendor:', error);
      return null;
    }

    if (data) {
      // Add timestamp for cache invalidation
      const vendorWithTimestamp = { ...data, timestamp: Date.now() };
      vendorCache.set(cleanDomain, vendorWithTimestamp);
      return vendorWithTimestamp;
    }

    return null;
  } catch (error) {
    console.error('Error in getVendorByDomain:', error);
    return null;
  }
}

/**
 * Get vendor by slug (for subdomains)
 */
export async function getVendorBySlug(slug: string): Promise<Vendor | null> {
  try {
    const { data, error } = await supabase
      .from('vendors')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'active')
      .single();

    if (error) {
      console.error('Error fetching vendor by slug:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getVendorBySlug:', error);
    return null;
  }
}

/**
 * Get current vendor context (server-side)
 */
export async function getCurrentVendor(headers: Headers): Promise<Vendor | null> {
  const host = headers.get('host') || '';
  return getVendorByDomain(host);
}

/**
 * Get all active vendors
 */
export async function getAllActiveVendors(): Promise<Vendor[]> {
  try {
    const { data, error } = await supabase
      .from('vendors')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all vendors:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getAllActiveVendors:', error);
    return [];
  }
}

/**
 * Check if domain is available for registration
 */
export async function isDomainAvailable(domain: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('vendors')
      .select('domain')
      .or(`domain.eq.${domain},domain.eq.www.${domain}`);

    if (error) {
      console.error('Error checking domain availability:', error);
      return false;
    }

    // If no vendor uses this domain, it's available
    return !data || data.length === 0;
  } catch (error) {
    console.error('Error in isDomainAvailable:', error);
    return false;
  }
}

/**
 * Clean domain string
 */
function cleanDomainString(domain: string): string {
  // Remove protocol, port, and trailing slashes
  return domain
    .replace(/^(https?:\/\/)?(www\.)?/, '') // Remove protocol and www
    .replace(/:\d+$/, '') // Remove port
    .replace(/\/$/, '') // Remove trailing slash
    .toLowerCase()
    .trim();
}

/**
 * Extract slug from current URL (for routing)
 */
export function getSlugFromHost(host: string): string | null {
  const cleanHost = cleanDomainString(host);
  
  // Check if it's a subdomain of supermart.com
  if (cleanHost.includes('.supermart.com')) {
    return cleanHost.split('.')[0];
  }
  
  // For custom domains, we'll look up via database
  return null;
}

/**
 * Get vendor-specific table name
 */
export function getVendorTableName(vendorId: string, baseTable: string): string {
  // This implements the per-vendor table naming pattern
  // Example: vendor_id = 'beads' → 'beads_users'
  return `${vendorId}_${baseTable}`;
}

/**
 * Clear vendor cache (useful for updates)
 */
export function clearVendorCache(domain?: string): void {
  if (domain) {
    vendorCache.delete(cleanDomainString(domain));
  } else {
    vendorCache.clear();
  }
}