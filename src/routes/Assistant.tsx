import { Helmet } from "react-helmet-async";
import DietVoiceAssistant from "../components/DietVoiceAssistant";

export default function Assistant() {
  return (
    <>
      <Helmet><title>Voice Diet Assistant — Figure ‘n Fit</title></Helmet>
      <DietVoiceAssistant />
    </>
  );
}
