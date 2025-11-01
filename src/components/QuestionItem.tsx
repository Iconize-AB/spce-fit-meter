import { Question, QuestionOption } from "@/types/questionnaire";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FitScoreIndicator } from "./FitScoreIndicator";

interface QuestionItemProps {
  question: Question;
  value?: string;
  score?: number;
  onChange: (value: string, score: number) => void;
  hideScoreIndicator?: boolean;
  isCalculated?: boolean;
  calculatedValue?: string;
}

export const QuestionItem = ({ question, value, score = 0, onChange, hideScoreIndicator = false, isCalculated = false, calculatedValue }: QuestionItemProps) => {
  const handleChange = (selectedValue: string) => {
    const option = question.options.find((opt) => opt.value === selectedValue);
    if (option) {
      onChange(selectedValue, option.score);
    }
  };

  // Filter out empty value options (placeholders)
  const validOptions = question.options.filter(opt => opt.value !== "");
  const placeholderText = question.options.find(opt => opt.value === "")?.label || "Select an option";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 py-3 border-b border-border last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{question.text}</p>
      </div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0 w-full sm:w-auto">
        {isCalculated ? (
          <div className="w-full sm:w-[200px] md:w-[280px] h-10 px-3 py-2 bg-muted rounded-md border border-border flex items-center justify-start text-sm font-medium">
            {calculatedValue || "N/A"}
          </div>
        ) : (
          <Select value={value} onValueChange={handleChange}>
            <SelectTrigger className="w-full sm:w-[200px] md:w-[280px]">
              <SelectValue placeholder={placeholderText} />
            </SelectTrigger>
            <SelectContent>
              {validOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {!hideScoreIndicator && (
          <FitScoreIndicator score={score} className="w-full sm:w-auto sm:min-w-[110px] text-center sm:text-left" />
        )}
      </div>
    </div>
  );
};
