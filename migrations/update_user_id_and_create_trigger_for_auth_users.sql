-- Update ID into UUID
ALTER TABLE public.users
DROP COLUMN id;
ALTER TABLE public.users
ADD COLUMN id uuid references auth.users not null primary key;
-- Update createdAt and updatedAt into timestampz 
ALTER TABLE public.users
ALTER COLUMN "createdAt" TYPE timestamptz,
ALTER COLUMN "updatedAt" TYPE timestamptz;
ALTER TABLE public.users
ALTER COLUMN "createdAt" SET DEFAULT now() AT TIME ZONE 'UTC',
ALTER COLUMN "updatedAt" SET DEFAULT now() AT TIME ZONE 'UTC';

-- NOTE: THIS IS ONLY ON STARTUP
DROP TABLE IF EXISTS public.user_roles;
CREATE TABLE public.user_roles (
    "id" uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    "user_id" uuid NOT NULL,
    "title" varchar(100) NOT NULL,
    "createdAt" timestamptz,
    "updatedAt" timestamptz
);
ALTER TABLE public.user_roles
ALTER COLUMN "createdAt" SET DEFAULT now() AT TIME ZONE 'UTC',
ALTER COLUMN "updatedAt" SET DEFAULT now() AT TIME ZONE 'UTC';

-- Added function for auth.users will automatically added on the public.users
DROP FUNCTION IF EXISTS auth.on_auth_user_created_insert_row_in_profiles CASCADE;  

CREATE FUNCTION auth.on_auth_user_created_insert_row_in_profiles()
RETURNS TRIGGER AS $$
BEGIN
   -- Insert into public.users
   INSERT INTO public.users(id, email, name)
   VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');  -- Accessing the full_name from metadata

   -- Insert into public.user_roles
   INSERT INTO public.user_roles(user_id, title)
   VALUES (NEW.id, 'member');

   RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE PROCEDURE auth.on_auth_user_created_insert_row_in_profiles();


  -- TODO: CREATE INDEXES ALSO IS A MUST!
  -- TODO: MUST NEED TO DELETE THE ROLES TABLE