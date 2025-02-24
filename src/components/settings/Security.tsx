import { SecuritySchema } from "@/schema/settings";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "../ui/form";
import FieldInput, { FieldItems } from "../base/FieldInput";
import { Button } from "../base/Button";

import toast from "react-hot-toast";
import { useState } from "react";

type FormType = z.infer<typeof SecuritySchema>;

export default function Security() {
  const [loading, setLoading] = useState(false);

  const form = useForm<FormType>({
    resolver: zodResolver(SecuritySchema),
    defaultValues: {
      old_password: "",
      password: "",
      confirm_password: "",
    },
  });

  const fields: FieldItems[] = [
    {
      name: "old_password",
      label: "Old Password",
      fieldType: "input",
      props: { type: "password" },
    },
    {
      name: "password",
      label: "New Password",
      fieldType: "input",
      props: { type: "password" },
    },
    {
      name: "confirm_password",
      label: "Confirm Password",
      fieldType: "input",
      props: { type: "password" },
    },
  ];

  async function onSubmit(values: FormType) {
    setLoading(true);
    setTimeout(() => {
      console.log(values);
      toast.success("Password updated successfully");
      form.reset();
      setLoading(false);
    }, 3000);
  }

  return (
    <div className="md:px-6 py-6  w-full mx-auto max-w-lg">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex-1 flex flex-col gap-4 text-dark"
        >
          <FieldInput form={form} fields={fields} loading={loading} />

          <div className="flex items-center justify-end">
            <Button
              loading={loading}
              className="w-full md:w-auto px-16"
              type="submit"
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
