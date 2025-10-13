import { QuestionnaireData } from "@/types/questionnaire";

export const questionnaireData: QuestionnaireData = {
  sections: [
    {
      id: "company",
      title: "Company",
      questions: [
        {
          id: "industry",
          text: "Industry",
          options: [
            { label: "Select industry", value: "", score: 0 },
            { label: "Technology", value: "technology", score: 100 },
            { label: "Life Science/Medtech", value: "lifescience", score: 100 },
            { label: "Finance", value: "finance", score: 50 },
            { label: "Retail", value: "retail", score: 50 },
            { label: "Other", value: "other", score: 50 },
          ],
        },
        {
          id: "revenue",
          text: "Annual revenue ($M)",
          options: [
            { label: "Select revenue", value: "", score: 0 },
            { label: "<2", value: "<2", score: 0 },
            { label: "2 - 5", value: "2-5", score: 50 },
            { label: "5 - 10", value: "5-10", score: 100 },
            { label: "10 - 25", value: "10-25", score: 100 },
            { label: "25 - 50", value: "25-50", score: 50 },
            { label: "50+", value: "50+", score: 0 },
          ],
        },
        {
          id: "market_size",
          text: "Market size",
          options: [
            { label: "Select market size", value: "", score: 0 },
            { label: "Local (1 country)", value: "local", score: 0 },
            { label: "Regional (some countries)", value: "regional", score: 50 },
            { label: "Continent (EU, AMERICAS, APAC etc.)", value: "continent", score: 100 },
            { label: "Global (world-wide)", value: "global", score: 100 },
          ],
        },
        {
          id: "gtm_model",
          text: "GTM model",
          options: [
            { label: "Select GTM model", value: "", score: 0 },
            { label: "D2C (Direct to Consumer)", value: "d2c", score: 0 },
            { label: "B2C (Business to Consumer)", value: "b2c", score: 0 },
            { label: "B2B (Business to Business)", value: "b2b", score: 100 },
          ],
        },
        {
          id: "partners",
          text: "No of partners",
          options: [
            { label: "Select number", value: "", score: 0 },
            { label: "1-10", value: "1-10", score: 0 },
            { label: "11-20", value: "11-20", score: 100 },
            { label: "21-50", value: "21-50", score: 100 },
            { label: "51-100", value: "51-100", score: 100 },
            { label: "101 - 250", value: "101-250", score: 100 },
            { label: "250+", value: "250+", score: 50 },
          ],
        },
        {
          id: "channel_growth",
          text: "Channel growth",
          options: [
            { label: "Select growth", value: "", score: 0 },
            { label: "Negative", value: "negative", score: 0 },
            { label: "Flat (+/-0%)", value: "flat", score: 0 },
            { label: "+1 - 10%", value: "1-10", score: 50 },
            { label: "+ 11 - 25%", value: "11-25", score: 100 },
            { label: "+26 - 50%", value: "26-50", score: 100 },
            { label: ">50+ %", value: "50+", score: 100 },
          ],
        },
        {
          id: "pam_count",
          text: "No of Partner Managers (PAM's)",
          options: [
            { label: "Select number", value: "", score: 0 },
            { label: "1-2", value: "1-2", score: 50 },
            { label: "3-5", value: "3-5", score: 70 },
            { label: "6-10", value: "6-10", score: 85 },
            { label: "11-20", value: "11-20", score: 95 },
            { label: "20+", value: "20+", score: 100 },
          ],
        },
        {
          id: "partners_pam_ratio",
          text: "Partners / PAM Ratio",
          options: [
            { label: "Select ratio", value: "", score: 0 },
            { label: "1 - 5", value: "1-5", score: 0 },
            { label: "6 - 10", value: "6-10", score: 50 },
            { label: "11 - 20", value: "11-20", score: 100 },
            { label: "21 - 50", value: "21-50", score: 100 },
            { label: "50+", value: "50+", score: 100 },
          ],
        },
      ],
    },
    {
      id: "product_portfolio",
      title: "Product Portfolio",
      questions: [
        {
          id: "product_lines",
          text: "No of Product lines",
          options: [
            { label: "Select number", value: "", score: 0 },
            { label: "1", value: "1", score: 50 },
            { label: "2 - 5", value: "2-5", score: 100 },
            { label: "6 - 10", value: "6-10", score: 100 },
            { label: "11 - 25", value: "11-25", score: 50 },
            { label: "26 - 50", value: "26-50", score: 50 },
            { label: "50+", value: "50+", score: 0 },
          ],
        },
        {
          id: "skus",
          text: "No of SKU's",
          options: [
            { label: "Select number", value: "", score: 0 },
            { label: "1", value: "1", score: 0 },
            { label: "2 - 25", value: "2-25", score: 100 },
            { label: "26 - 100", value: "26-100", score: 100 },
            { label: "101 - 250", value: "101-250", score: 100 },
            { label: "251 - 1000", value: "251-1000", score: 50 },
            { label: "1000+", value: "1000+", score: 0 },
          ],
        },
        {
          id: "product_characteristics",
          text: "Product characteristics (major product lines are…)",
          options: [
            { label: "Select type", value: "", score: 0 },
            { label: "Simple or Standard products", value: "simple", score: 50 },
            { label: "Technical products", value: "technical", score: 100 },
            { label: "Configurable products", value: "configurable", score: 100 },
            { label: "Customer unique", value: "unique", score: 0 },
            { label: "Services", value: "services", score: 0 },
          ],
        },
        {
          id: "complexity_to_sell",
          text: "To sell: Complexity to sell (Partners/Sales reps)",
          options: [
            { label: "Select complexity", value: "", score: 0 },
            { label: "No training needed", value: "no_training", score: 0 },
            { label: "Some training needed", value: "some_training", score: 50 },
            { label: "Training is required", value: "required", score: 100 },
          ],
        },
        {
          id: "training_to_use",
          text: "To use: Training/Education (For safe and valuable end user usage)",
          options: [
            { label: "Select training level", value: "", score: 0 },
            { label: "No training needed", value: "no_training", score: 0 },
            { label: "Some training needed", value: "some_training", score: 50 },
            { label: "Training is required", value: "required", score: 100 },
          ],
        },
        {
          id: "update_cadence",
          text: "Update cadence",
          options: [
            { label: "Select cadence", value: "", score: 0 },
            { label: "Never", value: "never", score: 0 },
            { label: "We launch new products annually", value: "annually", score: 50 },
            { label: "We launch new products quarterly", value: "quarterly", score: 100 },
            { label: "We launch new products monthly", value: "monthly", score: 100 },
            { label: "We update products (HW or SW) frequently", value: "frequently", score: 100 },
          ],
        },
      ],
    },
    {
      id: "system_support",
      title: "System Support",
      questions: [
        {
          id: "digital_maturity",
          text: "Digital maturity",
          options: [
            { label: "Select maturity", value: "", score: 0 },
            { label: "Conservative with low digitalization", value: "conservative", score: 0 },
            { label: "Digitized", value: "digitized", score: 50 },
            { label: "Highly digitized", value: "highly_digitized", score: 100 },
          ],
        },
        {
          id: "crm_system",
          text: "Internal marketing & sales support",
          options: [
            { label: "Select CRM", value: "", score: 0 },
            { label: "We have no CRM system", value: "no_crm", score: 50 },
            { label: "We use Pipedrive CRM", value: "pipedrive", score: 50 },
            { label: "We use Hubspot CRM", value: "hubspot", score: 100 },
            { label: "We use Dynamics CRM", value: "dynamics", score: 100 },
            { label: "We use Salesforce CRM", value: "salesforce", score: 50 },
            { label: "We use other CRM", value: "other", score: 50 },
          ],
        },
        {
          id: "content_sharing",
          text: "Sharing content with Partners and Customers",
          options: [
            { label: "Select method", value: "", score: 0 },
            { label: "Download section on our web", value: "download", score: 50 },
            { label: "Dropbox or other drive", value: "dropbox", score: 50 },
            { label: "Google Drive", value: "gdrive", score: 50 },
            { label: "Sharepoint/Onedrive", value: "sharepoint", score: 100 },
            { label: "We have need but no solution", value: "no_solution", score: 100 },
            { label: "DAM/PIM System", value: "dam_pim", score: 50 },
            { label: "Partner portal with too low utilization", value: "portal_low", score: 100 },
            { label: "Partner portal with high utilization", value: "portal_high", score: 0 },
          ],
        },
        {
          id: "training_complement",
          text: "Complement to on-site/online training for partners and customers",
          options: [
            { label: "Select option", value: "", score: 0 },
            { label: "No need", value: "no_need", score: 0 },
            { label: "Need but no solution", value: "no_solution", score: 100 },
            { label: "Need and share videos (Youtube etc.)", value: "videos", score: 100 },
            { label: "Learning Management System w. issues", value: "lms_issues", score: 50 },
            { label: "Learning Management System that works", value: "lms_works", score: 0 },
          ],
        },
        {
          id: "leads_deals",
          text: "Managing Leads and Deals",
          options: [
            { label: "Select method", value: "", score: 0 },
            { label: "No need", value: "no_need", score: 0 },
            { label: "Need but no solution", value: "no_solution", score: 100 },
            { label: "Excel spreadsheets from/to partners", value: "excel", score: 100 },
            { label: "Partner Portal", value: "portal", score: 0 },
          ],
        },
      ],
    },
    {
      id: "industry_market",
      title: "Industry/Market",
      questions: [
        {
          id: "regulation",
          text: "Regulation",
          options: [
            { label: "Select level", value: "", score: 0 },
            { label: "No regulations", value: "no_reg", score: 0 },
            { label: "Some regulations", value: "some_reg", score: 50 },
            { label: "Regulated", value: "regulated", score: 100 },
            { label: "Highly regulated", value: "highly_reg", score: 100 },
          ],
        },
        {
          id: "channel_maturity",
          text: "Channel maturity",
          options: [
            { label: "Select maturity", value: "", score: 0 },
            { label: "No channel", value: "no_channel", score: 0 },
            { label: "Channel, but not the norm", value: "not_norm", score: 50 },
            { label: "Channel is norm", value: "norm", score: 100 },
            { label: "Channel is highly developed", value: "highly_developed", score: 100 },
          ],
        },
      ],
    },
  ],
};
