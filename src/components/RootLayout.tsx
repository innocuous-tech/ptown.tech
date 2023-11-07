'use client'

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { motion, MotionConfig, useReducedMotion } from 'framer-motion'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { GridPattern } from '@/components/GridPattern'
import { SocialMedia } from '@/components/SocialMedia'

const RootLayoutContext = createContext<{
  logoHovered: boolean
  setLogoHovered: React.Dispatch<React.SetStateAction<boolean>>
} | null>(null)

function XIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="m5.636 4.223 14.142 14.142-1.414 1.414L4.222 5.637z" />
      <path d="M4.222 18.363 18.364 4.22l1.414 1.414L5.636 19.777z" />
    </svg>
  )
}

function MenuIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M2 6h20v2H2zM2 16h20v2H2z" />
    </svg>
  )
}

function Header({
  isBlank = false,
  panelId,
  icon: Icon,
  expanded,
  onToggle,
  toggleRef,
  invert = false,
}: {
  isBlank?: boolean
  panelId: string
  icon: React.ComponentType<{ className?: string }>
  expanded: boolean
  onToggle: () => void
  toggleRef: React.RefObject<HTMLButtonElement>
  invert?: boolean
}) {
  return (
    <Container>
      <div className="flex items-center justify-between">
        {isBlank ? (
          <span
            className={clsx('text-xl font-bold', {
              'text-white': invert,
              'text-black': !invert,
            })}
          >
            Prophet Town
          </span>
        ) : (
          <Link
            href="/"
            aria-label="Home"
            className={clsx(
              'scale-100 rounded-sm px-2 outline-2 transition-all duration-200 ease-in-out active:scale-95 motion-reduce:hover:!scale-100 [&:not(:active)]:hover:scale-105',
              {
                'outline-black': !invert,
                'outline-white': invert,
              },
            )}
          >
            <span
              className={clsx('text-xl font-bold', {
                'text-white': invert,
                'text-black': !invert,
              })}
            >
              Prophet Town
            </span>
          </Link>
        )}

        {!isBlank && (
          <div className="flex items-center gap-x-8">
            <Button href="/contact" invert={invert}>
              Contact us
            </Button>
            <button
              ref={toggleRef}
              type="button"
              onClick={onToggle}
              aria-expanded={expanded ? 'true' : 'false'}
              aria-controls={panelId}
              className={clsx(
                'group -m-2.5 rounded-full p-2.5 transition',
                invert ? 'hover:bg-white/10' : 'hover:bg-neutral-950/10',
              )}
              aria-label="Toggle navigation"
            >
              <Icon
                className={clsx(
                  'h-6 w-6',
                  invert
                    ? 'fill-white group-hover:fill-neutral-200'
                    : 'fill-neutral-950 group-hover:fill-neutral-700',
                )}
              />
            </button>
          </div>
        )}
      </div>
    </Container>
  )
}

function NavigationRow({ children }: { children: React.ReactNode }) {
  return (
    // use `even:mt-px` on each div if you want to have multiple links per row
    <div className="focus-within:bg-neutral-800 hover:bg-neutral-800 sm:bg-neutral-950 [&:focus-within_a]:bg-neutral-800 [&:hover_a]:bg-neutral-800">
      <Container>
        <div className="grid grid-cols-1">{children}</div>
      </Container>
    </div>
  )
}

function NavigationItem({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="group relative isolate -mx-6 bg-neutral-950 px-6 py-10 underline-offset-4 outline-none even:mt-px focus-visible:underline sm:mx-0 sm:px-0 sm:py-16 sm:odd:pr-16 sm:even:mt-0 sm:even:border-l sm:even:border-neutral-800 sm:even:pl-16"
    >
      {children}
      <span className="absolute inset-y-0 -z-10 w-screen bg-neutral-900 opacity-0 transition group-odd:right-0 group-even:left-0" />
    </Link>
  )
}

function Navigation() {
  return (
    <nav className="mt-px font-display text-5xl font-medium tracking-tight text-white">
      <NavigationRow>
        <NavigationItem href="/work">Our Work</NavigationItem>
      </NavigationRow>

      <NavigationRow>
        <NavigationItem href="/about">About Us</NavigationItem>
      </NavigationRow>

      <NavigationRow>
        <NavigationItem href="/process">Our Process</NavigationItem>
      </NavigationRow>

      {/* What it looked like on init: */}
      {/* <NavigationRow>
        <NavigationItem href="/work">Our Work</NavigationItem>
        <NavigationItem href="/about">About Us</NavigationItem>
      </NavigationRow>
      <NavigationRow>
        <NavigationItem href="/process">Our Process</NavigationItem>
        <NavigationItem href="/blog">Blog</NavigationItem>
      </NavigationRow> */}
    </nav>
  )
}

function RootLayoutInner({
  children,
  isBlank = false,
}: {
  children: React.ReactNode
  isBlank?: boolean
}) {
  let panelId = useId()
  let [expanded, setExpanded] = useState(false)
  let openRef = useRef<React.ElementRef<'button'>>(null)
  let closeRef = useRef<React.ElementRef<'button'>>(null)
  let navRef = useRef<React.ElementRef<'div'>>(null)
  let shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (
        event.target instanceof HTMLElement &&
        event.target.closest('a')?.href === window.location.href
      ) {
        setExpanded(false)
      }
    }

    window.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <MotionConfig transition={shouldReduceMotion ? { duration: 0 } : undefined}>
      <header>
        <div
          className="absolute left-0 right-0 top-2 z-40 pt-14"
          aria-hidden={expanded ? 'true' : undefined}
          // @ts-ignore (https://github.com/facebook/react/issues/17157)
          inert={expanded ? '' : undefined}
        >
          <Header
            isBlank={isBlank}
            panelId={panelId}
            icon={MenuIcon}
            toggleRef={openRef}
            expanded={expanded}
            onToggle={() => {
              setExpanded((expanded) => !expanded)
              window.setTimeout(
                () => closeRef.current?.focus({ preventScroll: true }),
              )
            }}
          />
        </div>

        {!isBlank && (
          <motion.div
            layout
            id={panelId}
            style={{ height: expanded ? 'auto' : '0.5rem' }}
            className="relative z-50 overflow-hidden bg-neutral-950 pt-2"
            aria-hidden={expanded ? undefined : 'true'}
            // @ts-ignore (https://github.com/facebook/react/issues/17157)
            inert={expanded ? undefined : ''}
          >
            <motion.div layout className="bg-neutral-800">
              <div ref={navRef} className="bg-neutral-950 pb-16 pt-14">
                <Header
                  invert
                  panelId={panelId}
                  icon={XIcon}
                  toggleRef={closeRef}
                  expanded={expanded}
                  onToggle={() => {
                    setExpanded((expanded) => !expanded)
                    window.setTimeout(
                      () => openRef.current?.focus({ preventScroll: true }),
                    )
                  }}
                />
              </div>

              <Navigation />

              <div className="relative bg-neutral-950 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-neutral-800">
                <Container>
                  <div className="grid grid-cols-1 gap-y-10 pb-16 pt-10 sm:grid-cols-2 sm:pt-16">
                    <div className="sm:border-l sm:border-transparent sm:pl-16">
                      <h2 className="font-display text-base font-semibold text-white">
                        Follow us
                      </h2>
                      <SocialMedia className="mt-6" invert />
                    </div>
                  </div>
                </Container>
              </div>
            </motion.div>
          </motion.div>
        )}
      </header>

      <motion.div
        layout
        style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
        className="relative flex flex-auto overflow-hidden bg-white pt-14"
      >
        <motion.div
          layout
          className="relative isolate flex w-full flex-col pt-9"
        >
          <GridPattern
            className={clsx(
              'absolute inset-x-0 -top-14 -z-10 w-full fill-neutral-50 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]',
              {
                'h-[1000px]': !isBlank,
                'h-[2000px]': isBlank,
              },
            )}
            yOffset={-96}
            interactive
          />

          <main className="w-full flex-auto">{children}</main>

          {/* <Footer /> */}
        </motion.div>
      </motion.div>
    </MotionConfig>
  )
}

export function RootLayout({
  children,
  isBlank = false,
}: {
  children: React.ReactNode
  isBlank?: boolean
}) {
  let pathname = usePathname()
  let [logoHovered, setLogoHovered] = useState(false)

  return (
    <RootLayoutContext.Provider value={{ logoHovered, setLogoHovered }}>
      <RootLayoutInner key={pathname} isBlank={isBlank}>
        {children}
      </RootLayoutInner>
    </RootLayoutContext.Provider>
  )
}
