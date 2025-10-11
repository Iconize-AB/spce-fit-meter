import { useState, useMemo } from "react";
import { questionnaireData } from "@/data/questionnaireData";
import { Answer } from "@/types/questionnaire";
import { QuestionnaireSection } from "@/components/QuestionnaireSection";
import { Speedometer } from "@/components/Speedometer";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

const Index = () => {
  const [answers, setAnswers] = useState<Answer[]>([]);

  const handleAnswerChange = (questionId: string, value: string, score: number) => {
    setAnswers((prev) => {
      const existingIndex = prev.findIndex((a) => a.questionId === questionId);
      if (existingIndex >= 0) {
        const newAnswers = [...prev];
        newAnswers[existingIndex] = { questionId, value, score };
        return newAnswers;
      }
      return [...prev, { questionId, value, score }];
    });
  };

  const totalScore = useMemo(() => {
    if (answers.length === 0) return 0;
    const totalSum = answers.reduce((sum, answer) => sum + answer.score, 0);
    return totalSum / answers.length;
  }, [answers]);

  const totalQuestions = useMemo(() => {
    return questionnaireData.sections.reduce((sum, section) => sum + section.questions.length, 0);
  }, []);

  const handleReset = () => {
    setAnswers([]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                SP<span className="text-primary">_</span>CE Fit Assessment
              </h1>
              <p className="text-muted-foreground mt-1">
                Answer {totalQuestions} questions to calculate your fit score
              </p>
            </div>
            {answers.length > 0 && (
              <Button onClick={handleReset} variant="outline" size="sm">
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Progress indicator */}
        <div className="mb-8 p-4 bg-muted/30 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Overall Progress</span>
            <span className="text-sm text-muted-foreground">
              {answers.length} / {totalQuestions} questions answered
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(answers.length / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {questionnaireData.sections.map((section) => (
            <QuestionnaireSection
              key={section.id}
              section={section}
              answers={answers}
              onAnswerChange={handleAnswerChange}
            />
          ))}
        </div>

        {/* Speedometer */}
        {answers.length > 0 && (
          <div className="mt-12 bg-white rounded-xl border border-border p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-center text-foreground mb-2">
              Your SP<span className="text-primary">_</span>CE Score
            </h2>
            <Speedometer score={totalScore} />
          </div>
        )}

        {/* Empty state */}
        {answers.length === 0 && (
          <div className="mt-12 text-center p-12 bg-muted/20 rounded-xl border border-dashed border-border">
            <p className="text-lg text-muted-foreground">
              Start answering questions to see your SP_CE fit score
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 py-6 border-t border-border">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>Powered by SP_CE Partner Portal</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
