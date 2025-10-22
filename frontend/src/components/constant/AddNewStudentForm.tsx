import { useState } from "react";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { post } from "@/lib/http";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Dialog, DialogHeader, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";

const formSchema = z.object({
  student_id: z.string().min(3, {message: "student id must be 3 characters long"}),
  full_name: z.string().min(2,  {message: "student id must be 2 characters long"}),
  email: z.string().min(3,  {message: "student id must be 3 characters long"}),
  phone: z.string().min(7,  {message: "student id must be 7 characters long"}),
  grade: z.string().min(1,  {message: "student id must be 1 characters long"}),
  class: z.string().min(1,  {message: "student id must be 1 characters long"}),
  address: z.string().min(5, {message: "student id must be 5 characters long"}),
  user_name: z.string().min(3,  {message: "student id must be 3 characters long"}),
  password: z.string().min(6,  {message: "student id must be 6 characters long"}),
});

type FormSchema = z.infer<typeof formSchema>;

const AddNewStudentForm = ({ open, onClose}: {open: boolean; onClose: () => void }) => {
  const [loading, setLoading] = useState(false);
  const[message, setMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      student_id: "",
      full_name: "",
      email: "",
      phone: "",
      grade: "",
      class: "",
      address: "",
      user_name: "",
      password: "",
    },
  });

  const onSubmitHandler = async(values: z.infer<typeof formSchema>) => {
   setLoading(true);
   setMessage(null);
   
   const res = await post("add_student.php", values);

   if (res.success) {
    setMessage(res.message);
    form.reset();
   } else {
    setMessage(res.message)
   }

   setLoading(false);
  }
  
  return (
    <Dialog open = {open} onOpenChange={onClose} >
      <DialogContent className="max-w-3xl p-6 mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">Add New Student</DialogTitle>
          <DialogDescription>Fill in the detials to add new students to the system</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitHandler)} className="space-y-6 grid grid-cols-1 sm:grid-cols-2 gap-4 ">

            
            {(Object.keys(formSchema.shape) as (keyof FormSchema)[]).map((fieldName) => (
              <FormField 
                key={fieldName}
                control={form.control}
                name={fieldName}
                render={({ field}) => (
                  <FormItem className="flex flex-col">
                      <FormLabel className="font-medium">
                        {fieldName.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </FormLabel>
                      <FormControl>
                        <Input  
                          {...field} 
                          type={fieldName === "password" ? "password" : "text"} 
                          placeholder={`Enter ${fieldName.replace(/_/g, "")}`}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            {/* Button & Message */}
            <div className="flex items-center justify-center pt-4">
              <Button
              type="submit"
              className="w-30 bg-blue-600 rounded-full hover:bg-blue-800 cursor-pointer"
              disabled={loading}
              >
              {loading ? "Saving..." : "Add Student"}
            </Button>
            </div>
            {message && (
              <p
                className={`text-center text-sm ${
                  message.startsWith("") ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
 
export default AddNewStudentForm;