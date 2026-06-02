import Link from "next/link";
import { Home, Search, ArrowBack } from "@mui/icons-material";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="relative isolate min-h-[70vh] flex items-center justify-center px-4 py-20">
      <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-secondary opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72rem]" />
      </div>

      <div className="text-center animate-fade-up">
        <p className="text-base font-semibold text-primary">۴۰۴</p>
        <h1 className="mt-4 text-6xl font-bold tracking-tight text-foreground sm:text-8xl">
          صفحه یافت نشد
        </h1>
        <p className="mt-6 text-base leading-7 text-muted-foreground max-w-md mx-auto">
          صفحه‌ای که به دنبال آن هستید وجود ندارد یا تغییر کرده است. لطفاً آدرس را بررسی کنید یا به صفحه اصلی بازگردید.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/">
            <Button size="lg" className="gap-2">
              <Home fontSize="small" />
              صفحه اصلی
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" size="lg" className="gap-2">
              <Search fontSize="small" />
              محصولات
            </Button>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <ArrowBack fontSize="small" />
            بازگشت
          </button>
        </div>
      </div>
    </div>
  );
}