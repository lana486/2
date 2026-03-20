import { TeacherMaterialArticlePage } from "@/components/teacher-material-article-page";

type TeacherMaterialPageProps = {
  params: Promise<{
    materialId: string;
  }>;
};

export default async function TeacherMaterialPage({ params }: TeacherMaterialPageProps) {
  const { materialId } = await params;

  return <TeacherMaterialArticlePage materialId={decodeURIComponent(materialId)} />;
}
