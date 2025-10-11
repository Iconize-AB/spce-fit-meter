import { Section, Answer } from "@/types/questionnaire";
import { QuestionItem } from "./QuestionItem";
import { FitScoreIndicator } from "./FitScoreIndicator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo } from "react";

interface QuestionnaireSectionProps {
  section: Section;
  answers: Answer[];
  onAnswerChange: (questionId: string, value: string, score: number) => void;
}

export const QuestionnaireSection = ({ section, answers, onAnswerChange }: QuestionnaireSectionProps) => {
  const sectionScore = useMemo(() => {
    const sectionAnswers = answers.filter((a) =>
      section.questions.some((q) => q.id === a.questionId)
    );
    
    if (sectionAnswers.length === 0) return 0;
    
    const totalScore = sectionAnswers.reduce((sum, answer) => sum + answer.score, 0);
    return totalScore / sectionAnswers.length;
  }, [answers, section.questions]);

  const answeredCount = answers.filter((a) =>
    section.questions.some((q) => q.id === a.questionId)
  ).length;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/30">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-foreground">{section.title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {answeredCount} of {section.questions.length} questions answered
            </p>
          </div>
          <FitScoreIndicator score={sectionScore} className="text-sm" />
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-0">
          {section.questions.map((question) => {
            const answer = answers.find((a) => a.questionId === question.id);
            return (
              <QuestionItem
                key={question.id}
                question={question}
                value={answer?.value}
                score={answer?.score}
                onChange={(value, score) => onAnswerChange(question.id, value, score)}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
