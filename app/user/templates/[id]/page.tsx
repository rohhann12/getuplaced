import TemplateForm from '@/components/input/tempForm'
import TemplateInput from '@/components/input/templateinput'
// perfect on submit we go back to the templates page
// now we need resolve for promise.all and then we resolve for both in single request
function page() {
  return (
    <div>
        <TemplateForm
        />
    </div>
  )
}

export default page