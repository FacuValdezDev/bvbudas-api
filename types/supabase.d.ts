import { SupabaseClientOptions } from '@supabase/supabase-js';
import { Database } from './database.types';

declare module '@supabase/supabase-js' {
  interface SupabaseClientOptions<Schema = 'public'> {
    cookies?: {
      get(name: string): string | undefined;
      set(name: string, value: string, options: any): void;
      remove(name: string, options: any): void;
    };
    auth?: {
      persistSession?: boolean;
      autoRefreshToken?: boolean;
      detectSessionInUrl?: boolean;
      storageKey?: string;
    };
  }
}

declare global {
  type TypedSupabaseClient = SupabaseClient<Database>;
}