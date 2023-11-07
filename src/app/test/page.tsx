import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'

export default function TestPage() {
  return (
    <Container className="mt-24 sm:mt-32 md:mt-56">
      <FadeIn className="max-w-3xl">
        <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
          An executive technology partner you can trust
        </h1>
        <p className="my-6 text-xl text-neutral-600">
          Prophet Town is at the frontier of software development, and together
          we can build any product you can imagine.
        </p>
      </FadeIn>

      <FadeIn className="max-w-3xl" transition={{ delay: 0.5, duration: 0.5 }}>
        <ul className="flex list-none gap-4">
          <li key="contact">
            <Button href="mailto:inbox@ptown.tech?subject=Inquiry&body=I'm+interested+in+working+with+Ptown.tech+in+order+to...">
              Contact Us
            </Button>
          </li>

          <li key="learn-more">
            <Button href="https://docs.google.com/presentation/d/1YSouZKVSMY3KP4S7GZFiKLD2dzfJkYf1nKbinvczkFs/edit#slide=id.p">
              Learn More
            </Button>
          </li>
        </ul>
      </FadeIn>
    </Container>
  )
}
