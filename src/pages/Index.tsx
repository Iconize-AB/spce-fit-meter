import { useState, useMemo } from "react";
import { questionnaireData } from "@/data/questionnaireData";
import { Answer } from "@/types/questionnaire";
import { QuestionnaireSection } from "@/components/QuestionnaireSection";
import { Button } from "@/components/ui/button";
import { RotateCcw, Download } from "lucide-react";
import jsPDF from "jspdf";

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

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = 20;

    // Title
    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.text("SP_CE Fit Assessment Results", margin, yPosition);
    yPosition += 15;

    // Score
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Overall Fit Score: ${Math.round(totalScore)}%`, margin, yPosition);
    yPosition += 10;

    // Date
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Generated: ${new Date().toLocaleDateString()}`, margin, yPosition);
    yPosition += 15;

    // Sections and Questions
    questionnaireData.sections.forEach((section) => {
      // Check if we need a new page
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = 20;
      }

      // Section title
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.text(section.title, margin, yPosition);
      yPosition += 8;

      section.questions.forEach((question) => {
        const answer = answers.find((a) => a.questionId === question.id);

        // Check if we need a new page
        if (yPosition > 260) {
          pdf.addPage();
          yPosition = 20;
        }

        // Question
        pdf.setFontSize(11);
        pdf.setFont("helvetica", "bold");
        const questionLines = pdf.splitTextToSize(question.text, pageWidth - 2 * margin);
        pdf.text(questionLines, margin + 5, yPosition);
        yPosition += questionLines.length * 6;

        // Answer
        pdf.setFont("helvetica", "normal");
        if (answer) {
          const answerText = `Answer: ${answer.value} (Score: ${answer.score})`;
          const answerLines = pdf.splitTextToSize(answerText, pageWidth - 2 * margin);
          pdf.text(answerLines, margin + 5, yPosition);
          yPosition += answerLines.length * 6;
        } else {
          pdf.setTextColor(150, 150, 150);
          pdf.text("Not answered", margin + 5, yPosition);
          pdf.setTextColor(0, 0, 0);
          yPosition += 6;
        }

        yPosition += 5;
      });

      yPosition += 5;
    });

    pdf.save("space-fit-assessment.pdf");
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

        {/* Score Display */}
        {answers.length > 0 && (
          <div className="mt-12 bg-white rounded-xl border border-border p-12 shadow-lg">
            <h2 className="text-2xl font-bold text-center text-foreground mb-8">
              Your SP<span className="text-primary">_</span>CE Fit Score
            </h2>
            <div className="flex flex-col items-center justify-center space-y-6">
              <div
                className="text-8xl font-bold"
                style={{
                  color:
                    totalScore >= 67
                      ? "hsl(var(--score-green))"
                      : totalScore >= 35
                      ? "hsl(var(--score-orange))"
                      : "hsl(var(--score-red))",
                }}
              >
                {Math.round(totalScore)}%
              </div>
              <p className="text-xl font-semibold text-foreground">
                {totalScore >= 67
                  ? "Excellent fit with SP_CE!"
                  : totalScore >= 35
                  ? "Good potential alignment with SP_CE"
                  : "Lower fit - Consider reviewing your responses"}
              </p>
              <Button onClick={handleDownloadPDF} size="lg" className="rounded-full mt-4">
                <Download className="mr-2 h-5 w-5" />
                Download PDF Report
              </Button>
            </div>
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
