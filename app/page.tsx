import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { profile } from "@/lib/profile"

function ExternalLink({
  href,
  children,
  variant = "default",
}: {
  href: string
  children: string
  variant?: "default" | "outline" | "link"
}) {
  return (
    <Button
      nativeButton={false}
      variant={variant}
      className="w-fit"
      render={
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      }
    />
  )
}

function SkillList({ label, items }: { label: string; items: readonly string[] }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-medium">{label}</h3>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item}>
            <Badge variant="outline">{item}</Badge>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-12 px-5 py-12 sm:px-8 sm:py-16">
      <header className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <Avatar className="size-40 sm:size-48">
          <AvatarImage
            src="/victor.jpg"
            alt={profile.photoAlt}
            className="object-cover"
            style={{ objectPosition: "center 20%" }}
          />
          <AvatarFallback>VJ</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start gap-3">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {profile.name}
            </h1>
            <p className="text-lg text-primary">{profile.title}</p>
            <p className="text-sm text-muted-foreground">{profile.availability}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <ExternalLink href={profile.links.linkedin}>LinkedIn</ExternalLink>
            <ExternalLink href={profile.links.github} variant="outline">
              GitHub
            </ExternalLink>
          </div>
        </div>
      </header>

      <section className="flex flex-col gap-4" aria-labelledby="resumo">
        <h2 id="resumo" className="text-sm font-medium">
          Resumo
        </h2>
        <Separator />
        <p className="text-base leading-7">{profile.summary}</p>
      </section>

      <section className="flex flex-col gap-4" aria-labelledby="projetos">
        <h2 id="projetos" className="text-sm font-medium">
          Projetos
        </h2>
        <Separator />
        <div className="flex flex-col gap-4">
          {profile.projects.map((project) => (
            <Card key={project.name}>
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>
                  {project.role} · {project.kind} · {project.period}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="leading-6">{project.text}</p>
                <ul className="flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <li key={item}>
                      <Badge variant="secondary">{item}</Badge>
                    </li>
                  ))}
                </ul>
                {"href" in project ? (
                  <ExternalLink href={project.href}>{project.linkLabel}</ExternalLink>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4" aria-labelledby="competencias">
        <h2 id="competencias" className="text-sm font-medium">
          Competências
        </h2>
        <Separator />
        <SkillList label="Front-end" items={profile.skills.frontend} />
        <SkillList label="Back-end e entrega" items={profile.skills.backend} />
      </section>

      <section className="flex flex-col gap-4" aria-labelledby="formacao">
        <h2 id="formacao" className="text-sm font-medium">
          Formação
        </h2>
        <Separator />
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-medium">{profile.education.institution}</h3>
          <p className="text-sm text-muted-foreground">{profile.education.detail}</p>
        </div>
      </section>

      <footer className="flex flex-col gap-3 border-t pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>
          {profile.name}
          <span className="text-muted-foreground"> · {profile.availability}</span>
        </p>
        <div className="flex gap-1">
          <ExternalLink href={profile.links.linkedin} variant="link">
            LinkedIn
          </ExternalLink>
          <ExternalLink href={profile.links.github} variant="link">
            GitHub
          </ExternalLink>
        </div>
      </footer>
    </div>
  )
}
