-- Create team_members table
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_th TEXT NOT NULL,
  name_en TEXT,
  role TEXT NOT NULL,
  experience TEXT,
  education TEXT,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Assuming basic access control is needed)
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON team_members FOR SELECT USING (true);
