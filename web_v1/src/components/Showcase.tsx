import { useState, useEffect } from "react";
import { S, scrollToSection, SectionLabel } from "../utils/utils";
import axios from "axios";
import { endpoints } from "../api";
import type {
  Product,
  ProductCategory,
  ProductsPageResponse,
} from "../interfaces/Product";
import type {
  ProjectCategory,
  ProjectItemType,
  PropertyType,
  ProjectsPageResponse,
} from "../interfaces/Project";
import { type ApiResponse } from "../interfaces/ApiResponse";

// SHOWCASE SECTION

const PAGE_SIZE = 12; // 4 cols x 3 rows

// ── Formatting helpers ──────────────────────────────────────────────────────

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    maximumFractionDigits: 0,
  }).format(n);

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const provinces = [
  { type: "All Provinces", value: "all" },
  { type: "Central Province", value: "central" },
  { type: "Eastern Province", value: "eastern" },
  { type: "Northern Province", value: "northern" },
  { type: "North Central Province", value: "north_central" },
  { type: "North Western Province", value: "north_western" },
  { type: "Sabaragamuwa Province", value: "sabaragamuwa" },
  { type: "Southern Province", value: "southern" },
  { type: "Uva Province", value: "uva" },
  { type: "Western Province", value: "western" },
];

const formatProvince = (value: string) =>
  provinces.find((p) => p.value === value)?.type ?? value;

// Backend product category options (matches ProductCategory exactly)
const productCategoryOptions: {
  type: string;
  value: "all" | ProductCategory;
}[] = [
  { type: "All Categories", value: "all" },
  { type: "Solar Panel", value: "solar" },
  { type: "On Grid Inverter", value: "on_grid_inverter" },
  { type: "Off Grid Inverter", value: "off_grid_inverter" },
  { type: "Hybrid Inverter", value: "hybrid_inverter" },
  { type: "On Grid Battery", value: "on_grid_battery" },
  { type: "Off Grid Battery", value: "off_grid_battery" },
  { type: "Hybrid Battery", value: "hybrid_battery" },
];

const formatProductCategory = (value: string) =>
  productCategoryOptions.find((c) => c.value === value)?.type ?? value;

// Backend project category options (matches ProjectCategory exactly)
const projectCategoryOptions: {
  type: string;
  value: "all" | ProjectCategory;
}[] = [
  { type: "All Categories", value: "all" },
  { type: "On-Grid", value: "on_grid" },
  { type: "Off-Grid", value: "off_grid" },
  { type: "Hybrid", value: "hybrid" },
];

const formatProjectCategory = (value: string) =>
  projectCategoryOptions.find((c) => c.value === value)?.type ?? value;

// Backend property type options (matches PropertyType exactly)
const propertyTypeOptions: {
  type: string;
  value: "all" | PropertyType;
}[] = [
  { type: "All Property Types", value: "all" },
  { type: "Residential", value: "residential" },
  { type: "Commercial", value: "commercial" },
  { type: "Industrial", value: "industrial" },
  { type: "Agricultural", value: "agricultural" },
  { type: "Other", value: "other" },
];

const formatPropertyType = (value: string) =>
  propertyTypeOptions.find((t) => t.value === value)?.type ?? value;

async function fetchProductsPage(
  page: number,
): Promise<ProductsPageResponse> {
  const params = new URLSearchParams({
    page: String(page),
    size: String(PAGE_SIZE),
    sortBy: "createdAt",
    direction: "desc",
  });

  const res = await axios.get<ApiResponse<ProductsPageResponse>>(
    `${endpoints.product.getAll}?${params.toString()}`,
  );

  return res.data.data;
}

async function fetchProjectsPage(
  page: number,
): Promise<ProjectsPageResponse> {
  const params = new URLSearchParams({
    page: String(page),
    size: String(PAGE_SIZE),
    sortBy: "createdAt",
    direction: "desc",
  });

  const res = await axios.get<ApiResponse<ProjectsPageResponse>>(
    `${endpoints.project.getAll}?${params.toString()}`,
  );

  return res.data.data;
}

// ── Small presentational pieces ─────────────────────────────────────────────

function ImageGallery({
  images,
  alt,
}: {
  images: { imageUrl: string }[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const hasMultiple = images.length > 1;
  const goTo = (i: number) =>
    setActive(((i % images.length) + images.length) % images.length);

  if (images.length === 0) {
    return (
      <div
        className={`w-full h-72 sm:h-96 rounded-2xl border ${S.border} ${S.surface2} flex items-center justify-center ${S.textMuted} text-sm`}
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        No image available
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <img
          src={images[active]?.imageUrl}
          alt={`${alt} ${active + 1}`}
          className="w-full h-72 sm:h-96 object-cover rounded-2xl border border-(--border)"
        />
        {hasMultiple && (
          <>
            <button
              onClick={() => goTo(active - 1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11L5 7l4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => goTo(active + 1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span
              className="absolute bottom-3 right-3 bg-black/50 text-white text-[10px] px-2 py-1 rounded-full"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {active + 1} / {images.length}
            </span>
          </>
        )}
      </div>
      {hasMultiple && (
        <div className="flex gap-2 flex-wrap">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                i === active
                  ? "border-(--accent)"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={img.imageUrl}
                alt={`${alt} thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function MiniProductCard({
  p,
  onClick,
}: {
  p: Product;
  onClick: () => void;
}) {
  const firstImage = p.images?.[0]?.imageUrl;
  return (
    <button
      onClick={onClick}
      className={`text-left w-80 shrink-0 ${S.surface} border ${S.border} rounded-2xl overflow-hidden hover:border-(--accent) transition-all group`}
    >
      <div className="relative">
        <img
          src={firstImage}
          alt={p.productName}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
          draggable={false}
        />
        <span
          className="absolute top-3 left-3 accent-gradient text-(--accent-fg) text-[10px] font-semibold px-2.5 py-1.5 rounded-full"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {formatProductCategory(p.category)}
        </span>
      </div>
      <div className="p-6">
        <h4
          className={`text-lg font-bold ${S.text} truncate group-hover:text-(--accent) transition-colors`}
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          {p.productName}
        </h4>
        <p
          className={`text-sm ${S.textSec} mt-1.5`}
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {formatCurrency(p.productPrice)}
        </p>
      </div>
    </button>
  );
}

function MiniProjectCard({
  p,
  onClick,
}: {
  p: ProjectItemType;
  onClick: () => void;
}) {
  const firstImage = p.images?.[0]?.imageUrl;
  return (
    <button
      onClick={onClick}
      className={`text-left w-80 shrink-0 ${S.surface} border ${S.border} rounded-2xl overflow-hidden hover:border-(--accent) transition-all group`}
    >
      <div className="relative">
        <img
          src={firstImage}
          alt={p.projectName}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
          draggable={false}
        />
        <span
          className="absolute top-3 left-3 accent-gradient text-(--accent-fg) text-[10px] font-semibold px-2.5 py-1.5 rounded-full"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {formatProjectCategory(p.category)}
        </span>
      </div>
      <div className="p-6">
        <h4
          className={`text-lg font-bold ${S.text} truncate group-hover:text-(--accent) transition-colors`}
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          {p.projectName}
        </h4>
        <p
          className={`text-sm ${S.textSec} mt-1.5`}
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {formatProvince(p.province)}
        </p>
      </div>
    </button>
  );
}

function MarqueeRow({
  children,
  reverse,
  speed = 32,
}: {
  children: React.ReactNode;
  reverse?: boolean;
  speed?: number;
}) {
  return (
    <div
      className="overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
      }}
    >
      <div
        className="flex gap-5 w-max"
        style={{
          animation: `${reverse ? "showcaseMarqueeReverse" : "showcaseMarquee"} ${speed}s linear infinite`,
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.animationPlayState = "paused")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.animationPlayState = "running")
        }
      >
        {children}
        {children}
      </div>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
        active
          ? "accent-gradient text-(--accent-fg) border-transparent"
          : `${S.surface} ${S.border} ${S.textSec} hover:border-(--accent) hover:text-(--accent)`
      }`}
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {label}
    </button>
  );
}

function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className={`w-9 h-9 rounded-full border ${S.border} ${S.surface} ${S.textSec} flex items-center justify-center disabled:opacity-30 hover:border-(--accent) hover:text-(--accent) transition-all`}
      >
        <svg
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            d="M9 11L5 7l4-4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {pages.map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          className={`w-9 h-9 rounded-full text-xs font-bold transition-all ${n === page ? "accent-gradient text-(--accent-fg)" : `border ${S.border} ${S.surface} ${S.textSec} hover:border-(--accent) hover:text-(--accent)`}`}
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          {n}
        </button>
      ))}
      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className={`w-9 h-9 rounded-full border ${S.border} ${S.surface} ${S.textSec} flex items-center justify-center disabled:opacity-30 hover:border-(--accent) hover:text-(--accent) transition-all`}
      >
        <svg
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

function BackButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 text-sm ${S.textSec} hover:text-(--accent) mb-8 transition-colors`}
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <svg
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          d="M14 8H2M6 4L2 8l4 4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label}
    </button>
  );
}

function Overlay({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Fixed-size panel — same footprint whether content is one row or ten, content scrolls internally */}
      <div
        className={`${S.surface} border ${S.border} rounded-2xl w-full max-w-7xl relative flex flex-col`}
        style={{
          boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
          height: "min(88vh, 880px)",
          maxHeight: "92vh",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className={`absolute top-4 right-4 sm:top-5 sm:right-5 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full border ${S.border} ${S.surface2} ${S.textSec} flex items-center justify-center hover:text-(--accent) hover:border-(--accent) transition-all shrink-0`}
        >
          <svg
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M12 3L3 12M3 3l9 9" strokeLinecap="round" />
          </svg>
        </button>
        <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-8 lg:p-12">
          {children}
        </div>
      </div>
    </div>
  );
}

function DetailView({
  onBack,
  backLabel,
  images,
  badge,
  title,
  meta,
  description,
  ctaLabel = "Get a Similar Quote →",
}: {
  onBack: () => void;
  backLabel: string;
  images: { imageUrl: string }[];
  badge: string;
  title: string;
  meta: { label: string; val: string }[];
  description: string;
  ctaLabel?: string;
}) {
  return (
    <>
      <BackButton onClick={onBack} label={backLabel} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <ImageGallery key={title} images={images} alt={title} />
        <div className="flex flex-col gap-5">
          <div>
            <span
              className="accent-gradient text-(--accent-fg) text-xs font-semibold px-3 py-1 rounded-full"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {badge}
            </span>
            <h1
              className={`text-3xl font-black ${S.text} mt-3`}
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              {title}
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {meta.map((m) => (
              <div
                key={m.label}
                className={`${S.surface2} border ${S.border} rounded-xl p-4`}
              >
                <div
                  className={`text-xs ${S.textMuted} mb-1`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {m.label}
                </div>
                <div
                  className={`font-bold ${S.text}`}
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {m.val}
                </div>
              </div>
            ))}
          </div>
          <div>
            <h3
              className={`text-sm font-semibold tracking-widest uppercase text-(--accent) mb-2`}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Description
            </h3>
            <p
              className={`${S.textSec} text-sm leading-relaxed whitespace-pre-line`}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {description}
            </p>
          </div>
          {/* <button
            onClick={() => scrollToSection("contact")}
            className="accent-gradient text-(--accent-fg) font-semibold px-7 py-3.5 rounded-lg hover:opacity-90 w-fit text-sm"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {ctaLabel}
          </button> */}
        </div>
      </div>
    </>
  );
}

// ── Root export ──────────────────────────────────────────────────────────────

export function Showcase() {
  const [productsOpen, setProductsOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [allItemsProduct, setAllItemsProduct] = useState<Product[]>([]);
  const [productTotal, setProductTotal] = useState(0);
  const [allItemsProject, setAllItemsProject] = useState<ProjectItemType[]>([]);
  const [projectTotal, setProjectTotal] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItemType | null>(null);
  const [productCategory, setProductCategory] = useState<"all" | ProductCategory>(
    "all",
  );
  const [projectCategory, setProjectCategory] = useState<"all" | ProjectCategory>(
    "all",
  );
  const [projectPropertyType, setProjectPropertyType] = useState<
    "all" | PropertyType
  >("all");
  const [projectProvince, setProjectProvince] = useState<string>("all");

  // Products page state (frontend page is 1-based, backend page is 0-based)
  const [productPage, setProductPage] = useState(1);
  // Projects page state (frontend page is 1-based, backend page is 0-based)
  const [projectPage, setProjectPage] = useState(1);

  // ── Products: server-paginated load ───────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        // Frontend page 1 -> backend page 0, etc.
        const backendPage = productPage - 1;
        const page = await fetchProductsPage(backendPage);
        const response = page;
        if (cancelled) return;

        setAllItemsProduct(
          Array.isArray(response.items) ? response.items : [],
        );

        setProductTotal(
          typeof response.totalItems === "number" ? response.totalItems : 0,
        );
      } catch (error) {
        if (cancelled) return;

        console.log("Error fetching data : ", error);
        setAllItemsProduct([]);
        setProductTotal(0);
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, [productPage]);

  // ── Projects: server-paginated load ───────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    async function loadProjects() {
      try {
        // Frontend page 1 -> backend page 0, etc.
        const backendPage = projectPage - 1;
        const response = await fetchProjectsPage(backendPage);

        if (cancelled) return;

        setAllItemsProject(
          Array.isArray(response.items) ? response.items : [],
        );

        setProjectTotal(
          typeof response.totalItems === "number" ? response.totalItems : 0,
        );
      } catch (error) {
        if (cancelled) return;

        console.log("Error fetching data : ", error);
        setAllItemsProject([]);
        setProjectTotal(0);
      }
    }

    loadProjects();

    return () => {
      cancelled = true;
    };
  }, [projectPage]);

  const productTotalPages = Math.max(
    1,
    Math.ceil(productTotal / PAGE_SIZE),
  );
  const projectTotalPages = Math.max(
    1,
    Math.ceil(projectTotal / PAGE_SIZE),
  );

  // Category filtering is client-side over the currently loaded backend page
  const pagedProducts =
    productCategory === "all"
      ? allItemsProduct
      : allItemsProduct.filter((p) => p.category === productCategory);

  // Category / property type / province filtering is client-side over the
  // currently loaded backend page — same pattern as products.
  const pagedProjects = allItemsProject.filter((p) => {
    if (projectCategory !== "all" && p.category !== projectCategory) return false;
    if (projectPropertyType !== "all" && p.propertyType !== projectPropertyType)
      return false;
    if (projectProvince !== "all" && p.province !== projectProvince) return false;
    return true;
  });

  const applyProductCategory = (value: "all" | ProductCategory) => {
    setProductCategory(value);
    setProductPage(1);
  };
  const applyProjectCategory = (value: "all" | ProjectCategory) => {
    setProjectCategory(value);
    setProjectPage(1);
  };
  const applyProjectPropertyType = (value: "all" | PropertyType) => {
    setProjectPropertyType(value);
    setProjectPage(1);
  };
  const applyProjectProvince = (value: string) => {
    setProjectProvince(value);
    setProjectPage(1);
  };

  const clearProductFilters = () => {
    setProductCategory("all");
    setProductPage(1);
  };
  const clearProjectFilters = () => {
    setProjectCategory("all");
    setProjectPropertyType("all");
    setProjectProvince("all");
    setProjectPage(1);
  };

  const productFiltersActive = productCategory !== "all";
  const projectFiltersActive =
    projectCategory !== "all" ||
    projectPropertyType !== "all" ||
    projectProvince !== "all";

  const marqueeStyle = (
    <style>{`
      @keyframes showcaseMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      @keyframes showcaseMarqueeReverse { from { transform: translateX(-50%); } to { transform: translateX(0); } }
    `}</style>
  );

  const projectDetail = selectedProject && (
    <DetailView
      onBack={() => setSelectedProject(null)}
      backLabel="Back to Projects"
      images={selectedProject.images ?? []}
      badge={formatProjectCategory(selectedProject.category)}
      title={selectedProject.projectName}
      meta={[
        { label: "Client", val: selectedProject.personName },
        { label: "Province", val: formatProvince(selectedProject.province) },
        { label: "Location", val: selectedProject.location },
        { label: "Category", val: formatProjectCategory(selectedProject.category) },
        { label: "Property Type", val: formatPropertyType(selectedProject.propertyType) },
        { label: "Completed", val: formatDate(selectedProject.projectDate) },
      ]}
      description={selectedProject.projectDescription}
    />
  );

  const productDetail = selectedProduct && (
    <DetailView
      onBack={() => setSelectedProduct(null)}
      backLabel="Back to Products"
      images={selectedProduct.images ?? []}
      badge={formatProductCategory(selectedProduct.category)}
      title={selectedProduct.productName}
      meta={[
        { label: "Category", val: formatProductCategory(selectedProduct.category) },
        { label: "Price", val: formatCurrency(selectedProduct.productPrice) },
      ]}
      description={selectedProduct.productDescription}
      ctaLabel="Request a Quote →"
    />
  );

  const productsGrid = (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10">
        <div>
          <SectionLabel label="Catalogue" />
          <h1
            className={`text-3xl sm:text-4xl lg:text-5xl font-black ${S.text}`}
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            All <span className="text-(--accent)">Products</span>
          </h1>
        </div>
        <p
          className={`text-sm ${S.textSec}`}
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {productTotal} items
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-10">
        {productCategoryOptions.map((c) => (
          <FilterChip
            key={c.value}
            label={c.type}
            active={productCategory === c.value}
            onClick={() => applyProductCategory(c.value)}
          />
        ))}
        {productFiltersActive && (
          <button
            onClick={clearProductFilters}
            className={`ml-1 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border ${S.border} ${S.surface2} ${S.textMuted} hover:text-(--accent) hover:border-(--accent) transition-all`}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <svg
              width="12"
              height="12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 3L3 9M3 3l6 6" strokeLinecap="round" />
            </svg>
            Clear Filters
          </button>
        )}
      </div>

      {pagedProducts.length === 0 ? (
        <p
          className={`text-center py-20 ${S.textSec}`}
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          No products match this filter.
        </p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pagedProducts.map((p) => (
            <button
              key={p.productId}
              onClick={() => setSelectedProduct(p)}
              className={`text-left ${S.surface} border ${S.border} rounded-2xl overflow-hidden hover:border-(--accent) transition-all group`}
            >
              <img
                src={p.images?.[0]?.imageUrl}
                alt={p.productName}
                className="w-full h-28 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-3 sm:p-5 flex flex-col gap-1.5 sm:gap-2">
                <p
                  className={`text-[9px] sm:text-[10px] uppercase tracking-widest ${S.textMuted}`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {formatProductCategory(p.category)}
                </p>
                <h3
                  className={`text-xs sm:text-sm font-bold ${S.text} leading-snug group-hover:text-(--accent) transition-colors`}
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {p.productName}
                </h3>
                <div className={`${S.surface2} rounded-lg p-2 sm:p-2.5 mt-1`}>
                  <div
                    className={`text-[10px] sm:text-[11px] ${S.textMuted}`}
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Price
                  </div>
                  <div
                    className={`text-[11px] sm:text-xs font-semibold ${S.text}`}
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {formatCurrency(p.productPrice)}
                  </div>
                </div>
                <p
                  className={`text-[10px] sm:text-[11px] ${S.textSec} hidden sm:block line-clamp-2 whitespace-pre-line`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {p.productDescription}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      <Pagination
        page={productPage}
        totalPages={productTotalPages}
        onChange={setProductPage}
      />
    </>
  );

  const projectsGrid = (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10">
        <div>
          <SectionLabel label="Our Work" />
          <h1
            className={`text-3xl sm:text-4xl lg:text-5xl font-black ${S.text}`}
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            All <span className="text-(--accent)">Projects</span>
          </h1>
        </div>
        <p
          className={`text-sm ${S.textSec}`}
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {projectTotal} projects
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-6">
        {projectCategoryOptions.map((c) => (
          <FilterChip
            key={c.value}
            label={c.type}
            active={projectCategory === c.value}
            onClick={() => applyProjectCategory(c.value)}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-end gap-4 mb-10">
        <div>
          <label
            className={`block text-[11px] uppercase tracking-widest ${S.textMuted} mb-1.5`}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Property Type
          </label>
          <select
            value={projectPropertyType}
            onChange={(e) =>
              applyProjectPropertyType(e.target.value as "all" | PropertyType)
            }
            className={`${S.surface} border ${S.border} rounded-lg px-4 py-2.5 text-sm ${S.text} focus:outline-none focus:border-(--accent)`}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {propertyTypeOptions.map((t) => (
              <option key={t.value} value={t.value}>
                {t.type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            className={`block text-[11px] uppercase tracking-widest ${S.textMuted} mb-1.5`}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Province
          </label>
          <select
            value={projectProvince}
            onChange={(e) => applyProjectProvince(e.target.value)}
            className={`${S.surface} border ${S.border} rounded-lg px-4 py-2.5 text-sm ${S.text} focus:outline-none focus:border-(--accent)`}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {provinces.map((l) => (
              <option key={l.value} value={l.value}>
                {l.type}
              </option>
            ))}
          </select>
        </div>
        {projectFiltersActive && (
          <button
            onClick={clearProjectFilters}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold border ${S.border} ${S.surface2} ${S.textMuted} hover:text-(--accent) hover:border-(--accent) transition-all`}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <svg
              width="12"
              height="12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 3L3 9M3 3l6 6" strokeLinecap="round" />
            </svg>
            Clear Filters
          </button>
        )}
      </div>

      {pagedProjects.length === 0 ? (
        <p
          className={`text-center py-20 ${S.textSec}`}
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          No projects match this filter.
        </p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pagedProjects.map((p) => (
            <button
              key={p.projectId}
              onClick={() => setSelectedProject(p)}
              className={`text-left ${S.surface} border ${S.border} rounded-2xl overflow-hidden hover:border-(--accent) transition-all group`}
            >
              <div className="relative">
                <img
                  src={p.images?.[0]?.imageUrl}
                  alt={p.projectName}
                  className="w-full h-28 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span
                  className="absolute top-2 left-2 sm:top-3 sm:left-3 accent-gradient text-(--accent-fg) text-[9px] sm:text-[10px] font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {formatProjectCategory(p.category)}
                </span>
              </div>
              <div className="p-3 sm:p-5">
                <h3
                  className={`font-bold text-xs sm:text-sm ${S.text} mb-1 group-hover:text-(--accent) transition-colors`}
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {p.projectName}
                </h3>
                <div
                  className={`flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] ${S.textSec}`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <span>📍 {formatProvince(p.province)}</span>
                  <span className="hidden sm:inline">
                    {formatDate(p.projectDate)}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      <Pagination
        page={projectPage}
        totalPages={projectTotalPages}
        onChange={setProjectPage}
      />
    </>
  );

  return (
    <>
      {/* ── Showcase teaser (always visible) ─────────────────────────────── */}
      <div className={`py-24 ${S.ground} overflow-hidden`}>
        {marqueeStyle}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
          <SectionLabel label="Showcase" />
          <h1
            className={`text-5xl lg:text-6xl font-black ${S.text}`}
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Products & <span className="text-(--accent)">Projects</span>
          </h1>
          <p
            className={`mt-4 ${S.textSec} max-w-2xl text-lg`}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            A glimpse of our equipment range and completed installations —
            browse the full catalogue any time.
          </p>
        </div>

        {/* Products marquee — left to right */}
        <div className="mb-4 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          <h2
            className={`text-xl font-black ${S.text}`}
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Featured Products
          </h2>
        </div>
        {allItemsProduct.length > 0 && (
          <div className="mb-4">
            <MarqueeRow speed={30}>
              {allItemsProduct.slice(0, 5).map((p) => (
                <MiniProductCard
                  key={p.productId}
                  p={p}
                  onClick={() => setSelectedProduct(p)}
                />
              ))}
            </MarqueeRow>
          </div>
        )}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
          <button
            onClick={() => setProductsOpen(true)}
            className={`text-sm font-semibold ${S.textSec} hover:text-(--accent) transition-colors flex items-center gap-1.5`}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Check for more products
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M4 9h10M10 5l4 4-4 4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Projects marquee — right to left */}
        <div className="mb-4 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          <h2
            className={`text-xl font-black ${S.text}`}
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Featured Projects
          </h2>
        </div>
        {allItemsProject.length > 0 && (
          <div className="mb-4">
            <MarqueeRow reverse speed={30}>
              {allItemsProject.slice(0, 5).map((p) => (
                <MiniProjectCard
                  key={p.projectId}
                  p={p}
                  onClick={() => setSelectedProject(p)}
                />
              ))}
            </MarqueeRow>
          </div>
        )}
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <button
            onClick={() => setProjectsOpen(true)}
            className={`text-sm font-semibold ${S.textSec} hover:text-(--accent) transition-colors flex items-center gap-1.5`}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Check for more projects
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M4 9h10M10 5l4 4-4 4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Products overlay (grid, or detail once a product is picked) ─────── */}
      {productsOpen && (
        <Overlay
          onClose={() => {
            setProductsOpen(false);
            setSelectedProduct(null);
          }}
        >
          {selectedProduct ? productDetail : productsGrid}
        </Overlay>
      )}

      {/* ── Projects overlay (grid, or detail once a project is picked) ─────── */}
      {projectsOpen && (
        <Overlay
          onClose={() => {
            setProjectsOpen(false);
            setSelectedProject(null);
          }}
        >
          {selectedProject ? projectDetail : projectsGrid}
        </Overlay>
      )}

      {/* ── Detail opened directly from the teaser marquee ──────────────────── */}
      {selectedProduct && !productsOpen && (
        <Overlay onClose={() => setSelectedProduct(null)}>
          {productDetail}
        </Overlay>
      )}
      {selectedProject && !projectsOpen && (
        <Overlay onClose={() => setSelectedProject(null)}>
          {projectDetail}
        </Overlay>
      )}
    </>
  );
}