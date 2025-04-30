export default function profilesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            {children}
            <h2>Featured Profiles</h2>
            {/* <Carousel here /> */}
        </div>
    );
}