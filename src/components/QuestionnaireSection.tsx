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
  // Calculate Partners/PAM ratio
  const partnersValue = answers.find(a => a.questionId === "partners")?.value;
  const pamValue = answers.find(a => a.questionId === "pam_count")?.value;
  
  const calculatedRatio = useMemo(() => {
    if (!partnersValue || !pamValue) return null;
    
    const getNumericValue = (val: string): number => {
      if (val.includes("+")) {
        return parseInt(val.replace("+", ""));
      }
      const parts = val.split("-");
      if (parts.length === 2) {
        return (parseInt(parts[0]) + parseInt(parts[1])) / 2;
      }
      return parseInt(val);
    };
    
    const partners = getNumericValue(partnersValue);
    const pams = getNumericValue(pamValue);
    const ratio = Math.round(partners / pams);
    return { value: `${ratio}:1`, numericValue: ratio };
  }, [partnersValue, pamValue]);
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <CardTitle className="text-lg sm:text-xl font-bold text-foreground">{section.title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {answeredCount} of {section.questions.length} questions answered
            </p>
          </div>
          <FitScoreIndicator score={sectionScore} className="text-sm self-start sm:self-auto" />
        </div>
      </CardHeader>
      <CardContent className="pt-4 sm:pt-6">
        <div className="space-y-0">
          {section.questions.map((question) => {
            const answer = answers.find((a) => a.questionId === question.id);
            
            // Special handling for PAM count - hide score indicator
            if (question.id === "pam_count") {
              return (
                <QuestionItem
                  key={question.id}
                  question={question}
                  value={answer?.value}
                  score={answer?.score}
                  onChange={(value, score) => onAnswerChange(question.id, value, score)}
                  hideScoreIndicator={true}
                />
              );
            }
            
            // Special handling for Partners/PAM ratio - calculated field
            if (question.id === "partners_pam_ratio") {
              return (
                <QuestionItem
                  key={question.id}
                  question={question}
                  value={calculatedRatio?.value || ""}
                  score={100}
                  onChange={() => {}}
                  isCalculated={true}
                  calculatedValue={calculatedRatio?.value}
                />
              );
            }
            
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
