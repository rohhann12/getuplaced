import AppSidebar from "@/components/sidebar/sidebar";
import TemplateInput from "@/components/input/templateinput";

export default function Dashboard() {
  return (
    <div className="flex">
      <AppSidebar />
      <div className="flex-1">
        <TemplateInput />
      </div>
    </div>
  );
}
