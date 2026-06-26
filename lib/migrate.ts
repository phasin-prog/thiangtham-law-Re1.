import { getSupabaseAdmin } from './supabase'
import { lawyers } from './data/lawyers'
import { advisors } from './data/advisors'
import { team } from './data/team'
import { legalServices } from './data/services'
import { legalArticles } from './data/articles'

// This script can be run locally to seed Supabase
export async function migrate() {
  const supabase = getSupabaseAdmin()

  console.log('--- Starting Migration ---')

  const tables: Array<{ name: string; data: Array<Record<string, unknown>> }> = [
    {
      name: 'lawyers',
      data: lawyers.map(l => ({
        name: l.name,
        role: l.role,
        license_number: l.licenseNumber,
        expertise: l.expertise,
        experience: l.experience,
        bio: l.bio,
        image: l.image
      }))
    },
    {
      name: 'advisors',
      data: advisors.map(a => ({
        name: a.name,
        role: a.role,
        work_history: a.workHistory,
        image: a.image
      }))
    },
    {
      name: 'staff',
      data: team.map(t => ({
        name: t.name,
        role: t.role,
        duty: t.duty,
        image: t.image
      }))
    },
    {
      name: 'services',
      data: legalServices.map(s => ({
        slug: s.slug,
        title: s.title,
        description: s.description,
        overview: s.overview,
        icon: s.icon,
        topics: s.topics,
        help: s.help,
        documents_to_prepare: s.documentsToPrepare,
        note_title: s.noteTitle,
        note: s.note
      }))
    },
    {
      name: 'articles',
      data: legalArticles.map(a => ({
        slug: a.slug,
        title: a.title,
        excerpt: a.excerpt,
        category: a.category,
        category_key: a.categoryKey,
        author: a.author,
        date: a.date,
        read_time: a.readTime,
        sections: a.sections
      }))
    }
  ]

  for (const table of tables) {
    console.log(`Migrating ${table.name}...`)
    // Clear existing
    const { error: delError } = await supabase.from(table.name).delete().neq('id', -1)
    if (delError) {
      console.error(`Error clearing ${table.name}:`, delError.message)
      continue
    }

    const { error: insError } = await supabase.from(table.name).insert(table.data)
    if (insError) {
      console.error(`Error inserting into ${table.name}:`, insError.message)
    } else {
      console.log(`Successfully migrated ${table.name}`)
    }
  }

  console.log('--- Migration Completed ---')
}

// To run this, you can temporarily uncomment the line below 
// and run it via a temporary API route or a custom script runner.
// migrate()
