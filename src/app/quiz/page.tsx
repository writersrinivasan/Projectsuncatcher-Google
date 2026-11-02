import { Quiz } from "@/components/Quiz";
import { PageHeader } from "@/components/ui";
import { quiz } from "@/data/knowledge";

export const metadata = { title: "Quiz · Suncatcher Academy" };

export default function QuizPage() {
  return (
    <>
      <PageHeader kicker="Test the room" title={<>Mission <span className="text-gradient">quiz</span></>}>
        Ten questions. Put it on the big screen and let the audience shout their answers.
      </PageHeader>
      <section className="mx-auto max-w-3xl px-4">
        <Quiz questions={quiz} />
      </section>
    </>
  );
}
