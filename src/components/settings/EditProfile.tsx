import { useEffect, useState } from "react";

import { Button } from "@/components/base/Button";
import { Input } from "@/components/base/Input";
import SelectInput from "@/components/base/SelectInput";
import UserProfile from "./UserProfle";
import DateInput from "@/components/base/DateInput";
import Show from "@/components/base/Show";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProfileSchema } from "@/schema/settings";
import { COUNTRIES } from "@/lib/constant";
import { updateUser } from "@/lib/api/user";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { editUser } from "@/store/slices/userSlice";

export default function EditProfile() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.userDetails);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof EditProfileSchema>>({
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

  const fields: {
    name: keyof z.infer<typeof EditProfileSchema>; // Restrict names to schema keys
    label: string;
    type: string;
    options?: string[];
  }[] = [
    { name: "full_name", label: "Your Name", type: "text" },
    { name: "user_name", label: "User Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
    {
      name: "dob",
      label: "Date of Birth",
      type: "date",
    },
    { name: "present_address", label: "Present Address", type: "text" },
    { name: "permanent_address", label: "Permanent Address", type: "text" },
    { name: "city", label: "City", type: "text" },
    { name: "postal_code", label: "Postal Code", type: "numeric" },
    { name: "country", label: "Country", type: "select", options: COUNTRIES },
  ];

  async function onSubmit(values: z.infer<typeof EditProfileSchema>) {
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
          {fields.map(({ name, label, type, options }) => (
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormControl>
                    <div className="space-y-2 col-span-1">
                      <label className="text-sm" htmlFor={name}>
                        {label}
                      </label>

                      <Show>
                        <Show.When isTrue={type === "date"}>
                          <DateInput
                            disabled={loading}
                            id={name}
                            type={type}
                            error={error ? String(error.message) : ""}
                            {...field}
                          />
                        </Show.When>
                        <Show.When isTrue={type === "select"}>
                          <SelectInput
                            options={options ?? []}
                            disabled={loading}
                            id={name}
                            error={error ? String(error.message) : ""}
                            {...field}
                          />
                        </Show.When>
                        <Show.Else>
                          <Input
                            disabled={loading}
                            id={name}
                            type={type}
                            inputMode={
                              type === "numeric" ? "numeric" : undefined
                            }
                            error={error ? String(error.message) : ""}
                            {...field}
                          />
                        </Show.Else>
                      </Show>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
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
