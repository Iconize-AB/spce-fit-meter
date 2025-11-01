import { useState, useMemo } from "react";
import { questionnaireData } from "@/data/questionnaireData";
import { Answer } from "@/types/questionnaire";
import { QuestionnaireSection } from "@/components/QuestionnaireSection";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RotateCcw, Download } from "lucide-react";
import jsPDF from "jspdf";

const Index = () => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [productivityGain, setProductivityGain] = useState<number>(10);

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
    setProductivityGain(10);
  };

  // Calculate Partners/PAM ratio and potential savings
  const partnersValue = answers.find(a => a.questionId === "partners")?.value;
  const pamValue = answers.find(a => a.questionId === "pam_count")?.value;
  
  const calculatedMetrics = useMemo(() => {
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
    const potentialSavings = Math.round(pams * (productivityGain / 100) * 165);
    
    return { ratio, pams, potentialSavings };
  }, [partnersValue, pamValue, productivityGain]);

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

    // Date
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Generated: ${new Date().toLocaleDateString()}`, margin, yPosition);
    yPosition += 15;

    // Summary Box - Fit Score
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text("Your SP_CE Fit Score", margin, yPosition);
    yPosition += 8;
    pdf.setFontSize(24);
    const scoreColor = totalScore >= 67 ? [34, 197, 94] : totalScore >= 35 ? [249, 115, 22] : [239, 68, 68];
    pdf.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
    pdf.text(`${Math.round(totalScore)}%`, margin, yPosition);
    pdf.setTextColor(0, 0, 0);
    yPosition += 15;

    // Summary Box - Productivity Gain & Potential Savings
    if (calculatedMetrics) {
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.text("Productivity Gain", margin, yPosition);
      yPosition += 8;
      pdf.setFontSize(20);
      pdf.setTextColor(109, 40, 217);
      pdf.text(`${productivityGain}%`, margin, yPosition);
      pdf.setTextColor(0, 0, 0);
      yPosition += 15;

      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.text("Potential Savings", margin, yPosition);
      yPosition += 8;
      pdf.setFontSize(20);
      pdf.setTextColor(34, 197, 94);
      pdf.text(`${calculatedMetrics.potentialSavings} hours/month`, margin, yPosition);
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      yPosition += 7;
      pdf.text(`${calculatedMetrics.pams} PAMs × ${productivityGain}% × 165`, margin, yPosition);
      yPosition += 15;
    }

    yPosition += 5;

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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                SP<span className="text-primary">_</span>CE Fit Assessment
              </h1>
              <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                Answer {totalQuestions} questions to calculate your fit score
              </p>
            </div>
            {answers.length > 0 && (
              <Button onClick={handleReset} variant="outline" size="sm" className="self-start sm:self-auto">
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Progress indicator */}
        <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-muted/30 rounded-lg border border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
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
        <div className="space-y-4 sm:space-y-6">
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
          <div className="mt-8 sm:mt-12 space-y-6 sm:space-y-8">
            {/* Main Score */}
            <div className="bg-white rounded-xl border-border border p-6 sm:p-8 md:p-12 shadow-lg">
              <h2 className="text-xl sm:text-2xl font-bold text-center text-foreground mb-6 sm:mb-8">
                Your SP<span className="text-primary">_</span>CE Fit Score
              </h2>
              <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6">
                <div
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold"
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
                <p className="text-base sm:text-lg md:text-xl font-semibold text-foreground text-center px-4">
                  {totalScore >= 67
                    ? "Excellent fit with SP_CE!"
                    : totalScore >= 35
                    ? "Good potential alignment with SP_CE"
                    : "Lower fit - Consider reviewing your responses"}
                </p>
              </div>
            </div>

            {/* Productivity Gain & Potential Savings */}
            {calculatedMetrics && (
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                {/* Productivity Gain Slider */}
                <div className="bg-white rounded-xl border-border border p-6 sm:p-8 shadow-lg">
                  <h3 className="text-lg sm:text-xl font-bold text-center text-foreground mb-4 sm:mb-6">
                    Productivity Gain
                  </h3>
                  <div className="flex flex-col items-center space-y-4 sm:space-y-6">
                    <div className="text-4xl sm:text-5xl font-bold text-primary">
                      {productivityGain}%
                    </div>
                    <div className="w-full px-2 sm:px-4">
                      <Slider
                        value={[productivityGain]}
                        onValueChange={(value) => setProductivityGain(value[0])}
                        min={1}
                        max={50}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                        <span>1%</span>
                        <span className="hidden sm:inline">5%</span>
                        <span>10%</span>
                        <span className="hidden sm:inline">20%</span>
                        <span className="hidden md:inline">30%</span>
                        <span className="hidden sm:inline">40%</span>
                        <span>50%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Potential Savings */}
                <div className="bg-white rounded-xl border-border border p-6 sm:p-8 shadow-lg">
                  <h3 className="text-lg sm:text-xl font-bold text-center text-foreground mb-4 sm:mb-6">
                    Potential Savings
                  </h3>
                  <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4">
                    <div className="text-4xl sm:text-5xl font-bold" style={{ color: "hsl(var(--score-green))" }}>
                      {calculatedMetrics.potentialSavings}
                    </div>
                    <p className="text-base sm:text-lg font-medium text-muted-foreground">
                      hours/month
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground text-center px-2">
                      {calculatedMetrics.pams} PAMs × {productivityGain}% × 165
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Download Button */}
            <div className="flex justify-center">
              <Button onClick={handleDownloadPDF} size="lg" className="rounded-full w-full sm:w-auto">
                <Download className="mr-2 h-5 w-5" />
                Download PDF Report
              </Button>
            </div>
          </div>
        )}

        {/* Empty state */}
        {answers.length === 0 && (
          <div className="mt-8 sm:mt-12 text-center p-6 sm:p-12 bg-muted/20 rounded-xl border border-dashed border-border">
            <p className="text-base sm:text-lg text-muted-foreground">
              Start answering questions to see your SP_CE fit score
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 sm:mt-16 py-4 sm:py-6 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-sm text-muted-foreground">
          <p>Powered by SP_CE Partner Portal</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
