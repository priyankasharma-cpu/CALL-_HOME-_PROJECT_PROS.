import { useState } from "react";
import { Link } from "react-router-dom";
import {
  House,
  Wind,
  Snowflake,
  PanelsTopLeft,
  Droplets,
  Zap,
  Bath,
  CookingPot,
  Layers,
  CloudRain,
  Building2,
  Bug,
  Waves,
  Sprout,
  ShieldCheck,
  Truck,
  DoorOpen,
  Thermometer,
  Flame,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import { services, categories } from "../data/services";
const icons = {
  House,
  Wind,
  Snowflake,
  PanelsTopLeft,
  Droplets,
  Zap,
  Bath,
  CookingPot,
  Layers,
  CloudRain,
  Building2,
  Bug,
  Waves,
  Sprout,
  ShieldCheck,
  Truck,
  DoorOpen,
  Thermometer,
  Flame,
};
export function ServiceCard({ service }) {
  const Icon = icons[service.icon] || House;
  return (
    <Link className="service-card" to={`/services/${service.slug}`}>
      <div className="service-card-top">
        <span className="service-icon">
          <Icon size={28} strokeWidth={1.6} />
        </span>
        <ArrowUpRight size={19} />
      </div>
      <h3>{service.title}</h3>
      <p>{service.shortDescription}</p>
      <span className="service-more">
        Explore service <ArrowRight size={15} />
      </span>
    </Link>
  );
}
export default function ServicesGrid({ full = false }) {
  const [category, setCategory] = useState("All projects");
  const shown = services.filter(
    (s) => category === "All projects" || s.category === category,
  );
  return (
    <>
      <div className="filter-tabs" aria-label="Filter services">
        {categories.map((c) => (
          <button
            key={c}
            aria-pressed={category === c}
            className={category === c ? "selected" : ""}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="services-grid">
        {(full || category !== "All projects" ? shown : shown.slice(0, 8)).map(
          (s) => (
            <ServiceCard key={s.slug} service={s} />
          ),
        )}
      </div>
      {!full && (
        <div className="center-link">
          <Link className="text-link" to="/services">
            Explore all home services <ArrowRight size={17} />
          </Link>
        </div>
      )}
    </>
  );
}
