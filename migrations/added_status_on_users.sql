ALTER TABLE public.users
ADD COLUMN status varchar(10) DEFAULT 'ACTIVE' NOT NULL;