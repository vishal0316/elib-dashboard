import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { getBook, editBook } from "@/http/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { LoaderCircle } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  genre: z.string().min(2, {
    message: "Genre must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  coverImage: z
    .any()
    .refine(
      (file) => file instanceof FileList && file.length === 1,
      "Cover Image is required"
    ),
});

const EditBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: bookData, isLoading } = useQuery({
    queryKey: ["book", id],
    queryFn: () => getBook(id!),
    staleTime: 10000,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      genre: "",
      description: "",
      coverImage: null,
    },
  });

  useEffect(() => {
    if (bookData) {
      form.reset({
        title: bookData.data.title,
        genre: bookData.data.genre,
        description: bookData.data.description,
        coverImage: bookData.data.coverImage,
      });
    }
  }, [bookData, form]);

  const mutation = useMutation({
    mutationFn: async ({
      title,
      genre,
      description,
      coverImage,
    }: z.infer<typeof formSchema>) => {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("genre", genre);
      formData.append("description", description);
      formData.append("coverImage", coverImage[0]);
      await editBook(id!, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      navigate("/dashboard/books");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutation.mutate(values);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard/books">Books</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Edit</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-4">
              <Link to="/dashboard/books">
                <Button variant={"outline"}>
                  <span className="ml-2">Cancel</span>
                </Button>
              </Link>
              {/* <Button type="submit" disabled={mutation.status === "loading"}>
                {mutation.status === "loading" && (
                  <LoaderCircle className="animate-spin" />
                )}
                <span className="ml-2">Submit</span>
              </Button> */}
            </div>
          </div>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Edit Book</CardTitle>
              <CardDescription>
                Fill out the form below to edit the book.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input type="text" className="w-full" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="genre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Genre</FormLabel>
                      <FormControl>
                        <Input type="text" className="w-full" {...field} />
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
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea className="min-h-32" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("coverImage") ? (
                  <div className="flex flex-col ">
                    <h4 className="mb-2">Cover Image</h4>
                    <div className="relative w-32 h-32">
                      <img
                        src={form.watch("coverImage")}
                        alt="Cover"
                        className="w-full h-full object-cover rounded"
                      />
                      <button
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        onClick={() => form.setValue("coverImage", null)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                ) : (
                  <FormField
                    control={form.control}
                    name="coverImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cover Image</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            className="w-full"
                            onChange={(e) => field.onChange(e.target.files)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </section>
  );
};

export default EditBook;
