import WorldMapPage from "../pages/WorldMapPage";

/**
 * "The World" section, reached from the main nav. Now the interactive,
 * hotspot-driven Game of Thrones map — see src/pages/WorldMapPage.tsx and
 * src/components/map/*. Kept as a thin wrapper so App.tsx and the nav don't
 * need to change at all.
 */
const TheWorld = () => {
  return <WorldMapPage />;
};

export default TheWorld;
