import { useEffect, useState } from "react";

import { Button } from "@/components/base/Button";
import UserProfile from "./UserProfle";

import { Form } from "@/components/ui/form";

import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProfileSchema } from "@/schema/settings";
import { COUNTRIES } from "@/lib/constant";
import { updateUser } from "@/lib/api/user";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { editUser } from "@/store/slices/userSlice";
import FieldInput, { FieldItems } from "../base/FieldInput";

type FormType = z.infer<typeof EditProfileSchema>;

export default function EditProfile() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.userDetails);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormType>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      full_name: user?.full_name || "",
      email: user?.email || "",
      user_name: user?.user_name || "",
      password: user?.password || "",
      postal_code: user?.postal_code || "",
      dob: user?.dob || "",
      city: user?.city || "",
      country: user?.country || "",
      permanent_address: user?.permanent_address || "",
      present_address: user?.present_address || "",
    },
  });

  const fields: FieldItems[] = [
    { name: "full_name", label: "Your Name", fieldType: "input" },
    { name: "user_name", label: "User Name", fieldType: "input" },
    {
      name: "email",
      label: "Email",
      fieldType: "input",
      props: { type: "email", inputMode: "email" },
    },
    {
      name: "password",
      label: "Password",
      fieldType: "input",
      props: { type: "password" },
    },
    {
      name: "dob",
      label: "Date of Birth",
      fieldType: "date",
      props: { type: "date" },
    },
    { name: "present_address", label: "Present Address", fieldType: "input" },
    {
      name: "permanent_address",
      label: "Permanent Address",
      fieldType: "input",
    },
    { name: "city", label: "City", fieldType: "input" },
    {
      name: "postal_code",
      label: "Postal Code",
      fieldType: "input",
      props: { type: "numeric" },
    },
    {
      name: "country",
      label: "Country",
      fieldType: "select",
      props: { options: COUNTRIES },
    },
  ];

  async function onSubmit(values: FormType) {
    try {
      setLoading(true);
      const res = await updateUser(values);
      if (res.success) {
        dispatch(editUser(res.data));
        toast.success("Profile updated successfully");
      }
    } catch (error: any) {
      toast.error(error?.message || "Error occured");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user) {
      form.reset({
        full_name: user?.full_name || "",
        email: user?.email || "",
        user_name: user?.user_name || "",
        password: user?.password || "",
        postal_code: user?.postal_code || "",
        dob: user?.dob || "",
        city: user?.city || "",
        country: user?.country || "",
        permanent_address: user?.permanent_address || "",
        present_address: user?.present_address || "",
      });
    }
  }, [user, form]);

  return (
    <div className="md:px-6 py-6 w-full flex items-center md:items-start md flex-col md:flex-row gap-4 md:gap-14">
      <div>
        <UserProfile
          edit
          className={loading ? "pointer-events-none opacity-70" : ""}
        />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-6 text-dark"
        >
          <FieldInput form={form} fields={fields} loading={loading} />

          <div className="col-span-1 md:col-span-2 flex items-center justify-end">
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
