import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Template } from "@/types/template"
import { useTranslation } from "react-i18next";

type TemplateFormProps = {
  hrid: string;
  name: string;
  startDate: string;
  endDate: string;
  priority: number;
  description: string;
  onSave?: (data: Partial<Template>) => void;
}

export function TemplateForm(props: TemplateFormProps) {
  const { t } = useTranslation();

  const formSchema = z.object({
    hrid: z.string().min(1, t('templateForm.hridRequired')),
    name: z.string().min(1, t('templateForm.nameRequired')),
    startDate: z.string().min(1, t('templateForm.startDateRequired')),
    endDate: z.string().min(1, t('templateForm.endDateRequired')),
    priority: z.number().min(0, t('templateForm.priorityPositive')),
    description: z.string(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hrid: props.hrid,
      name: props.name,
      startDate: props.startDate,
      endDate: props.endDate,
      priority: props.priority,
      description: props.description,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (props.onSave) {
      props.onSave({
        ...values,
        startDate: new Date(values.startDate),
        endDate: new Date(values.endDate),
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="hrid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('templateForm.hrid')}</FormLabel>
              <FormControl>
                <Input placeholder={t('templateForm.hridPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('templateForm.name')}</FormLabel>
              <FormControl>
                <Input placeholder={t('templateForm.namePlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('templateForm.startDate')}</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('templateForm.endDate')}</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('templateForm.priority')}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={e => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('templateForm.description')}</FormLabel>
              <FormControl>
                <Input placeholder={t('templateForm.descriptionPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit">{t('templateForm.save')}</Button>
        </div>
      </form>
    </Form>
  )
}
