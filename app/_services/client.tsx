import { createClient, PostgrestError } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "supabaseUrl";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || "supabaseKey";

export const client = createClient(supabaseUrl, supabaseKey);

export const checkError = ({ data, error }: {data: unknown, error: PostgrestError }) => {
    if (error) {
        console.error(error);
        return error;
    }
    return data;
}
