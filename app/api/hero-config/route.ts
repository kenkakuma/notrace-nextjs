import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function GET() {
  try {
    const heroFilePath = path.join(process.cwd(), 'content/hero/main.md')

    // Check if file exists
    if (!fs.existsSync(heroFilePath)) {
      return NextResponse.json(
        { error: 'Hero configuration file not found' },
        { status: 404 }
      )
    }

    // Read and parse the markdown file
    const fileContents = fs.readFileSync(heroFilePath, 'utf8')
    const { data } = matter(fileContents)

    // Transform the data to match HeroConfig interface
    const config = {
      currentBackground: data.backgroundImage || '',
      heroContent: {
        title: data.heroTitle || '',
        description: data.description || '',
        button1Text: data.button1Text || '',
        button1Link: data.button1Link || '',
        button2Text: data.button2Text || '',
        button2Link: data.button2Link || '',
      },
      lastUpdated: data.lastUpdated || new Date().toISOString(),
    }

    return NextResponse.json(config)
  } catch (error) {
    console.error('Error reading hero config:', error)
    return NextResponse.json(
      { error: 'Failed to load hero configuration' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const heroFilePath = path.join(process.cwd(), 'content/hero/main.md')

    // Read existing file
    let existingData = {}
    if (fs.existsSync(heroFilePath)) {
      const fileContents = fs.readFileSync(heroFilePath, 'utf8')
      const parsed = matter(fileContents)
      existingData = parsed.data
    }

    // Update the data
    const updatedData = {
      ...existingData,
      backgroundImage: body.currentBackground,
      heroTitle: body.heroContent.title,
      subtitle: body.heroContent.subtitle || '日中コーヒービジネスの新基準',
      description: body.heroContent.description,
      button1Text: body.heroContent.button1Text,
      button1Link: body.heroContent.button1Link,
      button2Text: body.heroContent.button2Text,
      button2Link: body.heroContent.button2Link,
      lastUpdated: new Date().toISOString(),
    }

    // Write back to file
    const content = matter.stringify('このファイルは Sveltia CMS で管理されます。', updatedData)
    fs.writeFileSync(heroFilePath, content, 'utf8')

    return NextResponse.json({ success: true, data: updatedData })
  } catch (error) {
    console.error('Error updating hero config:', error)
    return NextResponse.json(
      { error: 'Failed to update hero configuration' },
      { status: 500 }
    )
  }
}
