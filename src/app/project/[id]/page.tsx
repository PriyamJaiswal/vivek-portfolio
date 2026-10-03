import { Metadata } from "next";
import { notFound } from "next/navigation";
import { allVideoProjects } from "@/db/projects";
import ProjectDetails from "@/components/project-details";

export async function generateStaticParams() {
  return allVideoProjects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = allVideoProjects.find((p) => p.id === id);

  if (!project) {
    return {
      title: "Project Not Found | Vivek Singh",
    };
  }

  const isYouTube = project.platform === "youtube";
  const ogImages = isYouTube
    ? [
        {
          url: `https://img.youtube.com/vi/${project.cover_image || project.id}/hqdefault.jpg`,
          width: 480,
          height: 360,
          alt: project.video_title,
        },
      ]
    : [];

  return {
    title: `${project.video_title} | Vivek Singh`,
    description: project.summary || project.video_description,
    openGraph: {
      title: `${project.video_title} | Vivek Singh`,
      description: project.summary || project.video_description,
      images: ogImages,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = allVideoProjects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return <ProjectDetails project={project} />;
}
