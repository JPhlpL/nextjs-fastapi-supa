-- Drop the existing "top_videos_metadata" column
ALTER TABLE public.users
DROP COLUMN id;

-- Create a new "top_videos_metadata" column with the desired type
ALTER TABLE public.users
ADD COLUMN id uuid references auth.users not null primary key;

-- Step 1: Alter the column types
ALTER TABLE public.users
ALTER COLUMN "createdAt" TYPE timestamptz,
ALTER COLUMN "updatedAt" TYPE timestamptz;

-- Step 2: Set default values
ALTER TABLE public.users
ALTER COLUMN "createdAt" SET DEFAULT now() AT TIME ZONE 'UTC',
ALTER COLUMN "updatedAt" SET DEFAULT now() AT TIME ZONE 'UTC';


DROP FUNCTION IF EXISTS auth.on_auth_user_created_insert_row_in_profiles cascade;  
create function auth.on_auth_user_created_insert_row_in_profiles()
returns trigger as $$
 BEGIN
   INSERT INTO public.users(id, email)
   VALUES (NEW.id, NEW.email);
   RETURN NEW;
 END;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure auth.on_auth_user_created_insert_row_in_profiles();