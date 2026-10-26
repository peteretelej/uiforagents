export function MediaCard({
  src,
  alt,
  caption,
  meta,
  href,
  width,
  height,
}: {
  src: string
  alt: string
  /** One mono uppercase line under the image (a figure caption, not a title). */
  caption?: string
  /** Right-aligned mono meta line (source, timestamp, id). */
  meta?: string
  /** When set, the card becomes a link: the border strengthens on hover, it never lifts. */
  href?: string
  width?: number
  height?: number
}) {
  const content = (
    <>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="block h-auto w-full rounded-sm"
      />
      {(caption || meta) && (
        <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-border pt-2.5">
          {caption && (
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              {caption}
            </span>
          )}
          {meta && (
            <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
              {meta}
            </span>
          )}
        </figcaption>
      )}
    </>
  )

  if (href) {
    return (
      <a href={href} className="gt-media-card block rounded-lg border border-border bg-card p-3">
        {content}
      </a>
    )
  }

  return (
    <figure className="gt-media-card rounded-lg border border-border bg-card p-3">{content}</figure>
  )
}
