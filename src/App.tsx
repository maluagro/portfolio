import { useEffect, useState, type ReactNode } from 'react'
import maluHero from './assets/malu-hero.jpg'
import apisMellifera from './assets/apis-mellifera.jpg'
import capturaEnxame from './assets/captura-enxame.jpg'
import meliponario from './assets/meliponario.jpg'
import jardinsDoMel from './assets/jardins-do-mel.jpg'
import ninhoAbelhaNativa from './assets/ninho-abelha-nativa.jpg'

const WHATSAPP = 'https://wa.me/5515996154429'
// Prefixo dos arquivos da pasta public (ex.: /portfolio/ no GitHub Pages)
const BASE = import.meta.env.BASE_URL

const navItems = [
  ['Sobre', 'sobre'],
  ['Especialidades', 'especialidades'],
  ['Cursos e Oficinas', 'cursos'],
  ['Formação', 'formacao'],
  ['Galeria', 'galeria'],
  ['Contato', 'contato'],
] as const

const specialties = [
  {
    icon: 'bee',
    title: 'Manejo de Apis mellifera',
    text: 'Boas práticas para o cuidado das colmeias, respeitando a biologia das abelhas e a segurança no manejo.',
  },
  {
    icon: 'hive',
    title: 'Meliponicultura e abelhas nativas',
    text: 'Orientação para criação racional e conservação de espécies brasileiras sem ferrão.',
  },
  {
    icon: 'hex',
    title: 'Implantação de apiários e meliponários',
    text: 'Planejamento do local, escolha das estruturas e organização do ambiente de criação.',
  },
  {
    icon: 'transfer',
    title: 'Captura e transferência de enxames',
    text: 'Procedimentos responsáveis, com avaliação do cenário e prioridade para a segurança.',
  },
  {
    icon: 'flower',
    title: 'Polinização e pasto apícola',
    text: 'Leitura da paisagem, calendário floral e integração entre abelhas e produção vegetal.',
  },
  {
    icon: 'leaf',
    title: 'Educação ambiental',
    text: 'Sensibilização sobre a preservação das abelhas e seu papel essencial nos ecossistemas.',
  },
]

const services = [
  {
    number: '01',
    title: 'Curso de iniciação à criação de abelhas',
    text: 'Uma introdução clara e responsável aos fundamentos da apicultura e da meliponicultura.',
  },
  {
    number: '02',
    title: 'Oficinas práticas para escolas',
    text: 'Vivências adaptadas a diferentes faixas etárias, conectando ciência, natureza e cidadania.',
  },
  {
    number: '03',
    title: 'Palestras de educação ambiental',
    text: 'Conteúdo acessível sobre polinização, biodiversidade e preservação das abelhas.',
  },
  {
    number: '04',
    title: 'Consultoria para implantação de meliponário',
    text: 'Acompanhamento técnico para planejar um espaço adequado às abelhas nativas sem ferrão.',
  },
]

// Fotos da galeria — para trocar, substitua os arquivos em src/assets
const gallery = [
  {
    src: capturaEnxame,
    title: 'Captura de enxame',
    subtitle: 'Recolhimento de enxame instalado em residência',
    alt: 'Duas pessoas com macacão de apicultor e máscara recolhendo um enxame instalado na janela de uma casa',
  },
  {
    src: meliponario,
    title: 'Meliponário',
    subtitle: 'Abelhas nativas criadas à sombra das árvores',
    alt: 'Meliponário em área arborizada, com várias caixas de abelhas nativas apoiadas em suportes individuais',
  },
  {
    src: jardinsDoMel,
    title: 'Projeto Jardins do Mel',
    subtitle: 'APAE Tatuí · educação ambiental',
    alt: 'Caixas coloridas de abelhas nativas sem ferrão acima da placa do Projeto Jardins do Mel, do Rotary Club de Tatuí para a APAE',
  },
  {
    src: ninhoAbelhaNativa,
    title: 'Abelhas sem ferrão',
    subtitle: 'Entrada de ninho de abelha nativa',
    alt: 'Abelha nativa sem ferrão na entrada do ninho, cercada por estruturas de resina avermelhada',
  },
] as const

function Icon({ name, size = 28 }: { name: string; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 32 32',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  if (name === 'bee')
    return (
      <svg {...common}>
        <ellipse cx="16" cy="17" rx="5" ry="7" />
        <path d="M12 14h8M11 18h10M14 11l2-3 2 3" />
        <path d="M12 14C7 9 4 12 6 16c1.5 3 4.5 2 6 1M20 14c5-5 8-2 6 2-1.5 3-4.5 2-6 1M14 24l2 3 2-3" />
      </svg>
    )
  if (name === 'hive')
    return (
      <svg {...common}>
        <path d="M8 12h16M6 17h20M8 22h16M10 7h12l5 10-5 10H10L5 17 10 7Z" />
        <path d="M13 22v-3h6v3" />
      </svg>
    )
  if (name === 'hex')
    return (
      <svg {...common}>
        <path d="m16 3 11 6.5v13L16 29 5 22.5v-13L16 3Z" />
        <path d="m16 9 6 3.5v7L16 23l-6-3.5v-7L16 9Z" />
      </svg>
    )
  if (name === 'transfer')
    return (
      <svg {...common}>
        <path d="M5 9h17M18 5l4 4-4 4M27 23H10M14 19l-4 4 4 4" />
      </svg>
    )
  if (name === 'flower')
    return (
      <svg {...common}>
        <circle cx="16" cy="14" r="3" />
        <path d="M16 11c-5-9-9-1-3 2-8-2-7 6 0 3-5 8 4 9 3 1 2 9 10 4 3-1 8 3 9-5 1-4-4-4-9-1 6-7-2-10-3-2Z" />
        <path d="M16 18v11M16 24c-4-4-7-2-7-2 2 4 7 4 7 4M16 23c3-4 7-3 7-3-1 4-7 5-7 5" />
      </svg>
    )
  if (name === 'leaf')
    return (
      <svg {...common}>
        <path d="M27 5C15 5 6 10 6 19c0 5 4 8 8 8 10 0 13-12 13-22Z" />
        <path d="M6 27c4-7 9-12 17-17M14 18c0-3-1-5-2-6M17 15c3 0 5 1 6 2" />
      </svg>
    )
  if (name === 'arrow')
    return (
      <svg {...common} viewBox="0 0 24 24">
        <path d="M5 12h14M14 7l5 5-5 5" />
      </svg>
    )
  if (name === 'whatsapp')
    return (
      <svg {...common} viewBox="0 0 24 24">
        <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.7A8.5 8.5 0 1 1 20.5 11.7Z" />
        <path d="M8.2 7.5c.2-.5.5-.5.8-.5h.4c.2 0 .4.1.5.4l.8 1.9c.1.3 0 .5-.1.7l-.6.7c-.2.2-.1.4 0 .6.5 1 1.3 1.8 2.3 2.3.2.1.4.2.6 0l.8-1c.2-.2.4-.3.7-.2l1.8.8c.3.1.5.2.5.4 0 .2-.1 1.3-.6 1.8-.5.5-1.2.8-2 .8-.6 0-1.4-.2-2.5-.7-1.5-.7-2.7-1.7-3.6-3-.8-1-1.3-2.2-1.5-3-.2-.8 0-1.5.3-2Z" />
      </svg>
    )
  if (name === 'mail')
    return (
      <svg {...common} viewBox="0 0 24 24">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    )
  if (name === 'pin')
    return (
      <svg {...common} viewBox="0 0 24 24">
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    )
  if (name === 'close')
    return (
      <svg {...common} viewBox="0 0 24 24">
        <path d="m6 6 12 12M18 6 6 18" />
      </svg>
    )
  return null
}

function SectionTitle({
  eyebrow,
  title,
  text,
  centered = false,
}: {
  eyebrow: string
  title: string
  text?: string
  centered?: boolean
}) {
  return (
    <div className={`section-heading reveal ${centered ? 'centered' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [lightbox, setLightbox] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = lightbox !== null || menuOpen ? 'hidden' : ''
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightbox(null)
        setMenuOpen(false)
      }
      if (lightbox !== null && event.key === 'ArrowRight')
        setLightbox((lightbox + 1) % gallery.length)
      if (lightbox !== null && event.key === 'ArrowLeft')
        setLightbox((lightbox - 1 + gallery.length) % gallery.length)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [lightbox, menuOpen])

  const serviceLink = (service: string) =>
    `${WHATSAPP}?text=${encodeURIComponent(`Olá, Malu! Gostaria de solicitar informações sobre: ${service}.`)}`

  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>

      <header className="site-header">
        <div className="container header-inner">
          <a href="#inicio" className="brand" aria-label="Malu Alves — início">
            <span className="brand-mark"><Icon name="hex" size={22} /></span>
            <span>Malu Alves<small>Engenheira Agrônoma</small></span>
          </a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            {navItems.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
          </nav>
          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            <span /><span /><span />
          </button>
        </div>
        <nav id="mobile-menu" className={`mobile-nav ${menuOpen ? 'open' : ''}`} aria-label="Navegação mobile">
          {navItems.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </nav>
      </header>

      <main id="conteudo">
        <section id="inicio" className="hero">
          <div className="honeycomb honeycomb-hero" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <span className="eyebrow"><i /> Conhecimento que cultiva e preserva</span>
              <h1>Engenheira Agrônoma <em>·</em> Apicultura e Meliponicultura</h1>
              <p>
                Manejo de abelhas, implantação de apiários e meliponários e educação
                ambiental para preservar quem poliniza nossos alimentos.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href={`${WHATSAPP}?text=${encodeURIComponent('Olá, Malu! Conheci seu trabalho pelo site e gostaria de conversar.')}`} target="_blank" rel="noreferrer">
                  <Icon name="whatsapp" size={21} /> Fale comigo no WhatsApp
                </a>
                <a className="button button-secondary" href="#especialidades">
                  Ver especialidades <Icon name="arrow" size={20} />
                </a>
              </div>
              <div className="hero-meta">
                <span><Icon name="pin" size={18} /> Tatuí e região · SP</span>
                <span>Atendimento técnico e educativo</span>
              </div>
            </div>
            <div className="hero-visual reveal">
              <div className="photo-frame">
                <img
                  className="hero-photo"
                  src={maluHero}
                  alt="Malu Alves apresentando caixas de abelhas nativas sem ferrão em uma atividade ao ar livre"
                  width="478"
                  height="605"
                  fetchPriority="high"
                />
                <span className="photo-label">Oficina prática · abelhas sem ferrão</span>
              </div>
              <div className="floating-note">
                <Icon name="flower" size={32} />
                <span><strong>Ciência e cuidado</strong> em cada manejo</span>
              </div>
            </div>
          </div>
          <a href="#sobre" className="scroll-cue" aria-label="Ir para a seção Sobre"><span /></a>
        </section>

        <section id="sobre" className="section about">
          <div className="container about-grid">
            <div className="about-visual reveal">
              <figure className="about-photo">
                <img src={apisMellifera} alt="Abelha Apis mellifera pousada na ponta de um dedo" width="690" height="706" loading="lazy" />
                <figcaption><Icon name="bee" size={26} /> <span><i>Apis mellifera</i>, a abelha-europeia-africanizada</span></figcaption>
              </figure>
              <div className="botanical-line" aria-hidden="true"><Icon name="leaf" size={120} /></div>
            </div>
            <div>
              <SectionTitle eyebrow="Sobre a Malu" title="Agronomia com propósito e conexão com a natureza" />
              <div className="about-text reveal">
                <p>
                  Engenheira Agrônoma, pós-graduada em <strong>Biociências: Apicultura e
                  Meliponicultura pela UNITAU</strong>. Une conhecimento técnico, sensibilidade
                  ambiental e uma comunicação próxima para tornar o universo das abelhas mais
                  acessível.
                </p>
                <p>
                  Sua visão agronômica integra produção vegetal, manejo de solo, Manejo Integrado
                  de Pragas (MIP) e polinização de culturas à experiência em educação ambiental e
                  capacitação de crianças, jovens e adultos.
                </p>
                <div className="about-tags">
                  <span>Produção vegetal</span><span>Manejo de solo</span>
                  <span>Polinização</span><span>Educação ambiental</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="especialidades" className="section specialties">
          <div className="honeycomb honeycomb-side" aria-hidden="true" />
          <div className="container">
            <SectionTitle
              eyebrow="Especialidades"
              title="Cuidado técnico, da colmeia à paisagem"
              text="Soluções para quem deseja criar, manejar, aprender e preservar com responsabilidade."
              centered
            />
            <div className="specialty-grid">
              {specialties.map((item, index) => (
                <article className="specialty-card reveal" key={item.title} style={{ '--delay': `${index * 45}ms` } as React.CSSProperties}>
                  <div className="icon-box"><Icon name={item.icon} /></div>
                  <span className="card-number">0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="cursos" className="section services">
          <div className="container">
            <div className="services-intro">
              <SectionTitle
                eyebrow="Cursos e oficinas"
                title="Aprender para multiplicar o cuidado"
                text="Atividades construídas com linguagem acessível, base técnica e experiências que aproximam as pessoas das abelhas."
              />
              <div className="services-seal reveal" aria-hidden="true">
                <Icon name="hex" size={68} /><span>Teoria<br />+ prática</span>
              </div>
            </div>
            <div className="service-list">
              {services.map((service) => (
                <article className="service-card reveal" key={service.number}>
                  <span className="service-number">{service.number}</span>
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                  </div>
                  <a href={serviceLink(service.title)} target="_blank" rel="noreferrer" aria-label={`Solicitar informações sobre ${service.title}`}>
                    Solicitar informações <Icon name="arrow" size={20} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="na-pratica" className="section practice">
          <div className="container practice-grid">
            <div className="practice-video reveal">
              <video
                controls
                playsInline
                preload="none"
                poster={`${BASE}video/oficina-poster.jpg`}
                aria-label="Vídeo: Malu Alves em atividade de campo com abelhas nativas sem ferrão"
              >
                <source src={`${BASE}video/oficina-abelhas-nativas.mp4`} type="video/mp4" />
              </video>
            </div>
            <div>
              <SectionTitle
                eyebrow="Na prática"
                title="Ver de perto para aprender a cuidar"
                text="Registro de uma atividade de campo em que a Malu apresenta caixas de abelhas nativas sem ferrão, mostra o interior de uma colônia e observa ninhos com o grupo."
              />
              <ul className="practice-list reveal">
                <li><Icon name="hive" size={22} /> Caixas racionais e estrutura da colônia</li>
                <li><Icon name="bee" size={22} /> Comportamento das abelhas na entrada do ninho</li>
                <li><Icon name="leaf" size={22} /> Relação entre as abelhas, as árvores e a paisagem</li>
              </ul>
              <a className="button button-primary reveal" href={serviceLink('oficina prática com abelhas nativas')} target="_blank" rel="noreferrer">
                <Icon name="whatsapp" size={21} /> Quero uma oficina assim
              </a>
            </div>
          </div>
        </section>

        <section id="formacao" className="section journey">
          <div className="container journey-grid">
            <div className="journey-sticky">
              <SectionTitle
                eyebrow="Formação e trajetória"
                title="Conhecimento construído no campo e em sala"
                text="Uma trajetória que conecta formação acadêmica, prática agronômica e educação."
              />
            </div>
            <div className="timeline">
              <TimelineItem label="Formação" title="Pós-Graduação em Biociências: Apicultura e Meliponicultura" detail="Universidade de Taubaté — UNITAU" />
              <TimelineItem label="Formação" title="Bacharelado em Engenharia Agronômica" detail="Faculdade Santa Bárbara · Tatuí/SP" />
              <TimelineItem label="Em andamento" title="Pós em Engenharia de Segurança do Trabalho" detail="Universidade Cruzeiro do Sul" />
              <TimelineItem label="Experiência" title="Atuação técnica e socioambiental" detail="Fazenda Águas Claras · Prefeitura de Tatuí – Banco de Alimentos (horta comunitária e MIP) · APAE Tatuí (Educadora Social Ambiental)" />
              <TimelineItem label="Capacitação" title="Cursos SENAR" detail="Apicultura e Meliponicultura (2018), Olericultura Orgânica, Turismo Rural, entre outros." />
            </div>
          </div>
        </section>

        <section id="galeria" className="section gallery-section">
          <div className="container">
            <div className="gallery-heading">
              <SectionTitle eyebrow="Galeria" title="Vivências que aproximam pessoas e natureza" />
            </div>
            <div className="gallery-grid">
              {gallery.map((item, index) => (
                <button className={`gallery-item item-${index + 1} reveal`} key={item.title} onClick={() => setLightbox(index)} aria-label={`Ampliar foto: ${item.title}`}>
                  <img src={item.src} alt={item.alt} loading="lazy" />
                  <span><small>{item.subtitle}</small><strong>{item.title}</strong></span>
                  <i aria-hidden="true">+</i>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="contato" className="section contact">
          <div className="honeycomb honeycomb-contact" aria-hidden="true" />
          <div className="container contact-grid">
            <div className="contact-copy reveal">
              <span className="eyebrow light">Vamos conversar?</span>
              <h2>Um projeto começa com uma boa conversa.</h2>
              <p>
                Para cursos, oficinas, palestras ou orientação técnica, conte um pouco sobre
                sua ideia. Será um prazer entender como posso ajudar.
              </p>
              <div className="contact-actions">
                <a className="button button-cream" href={`${WHATSAPP}?text=${encodeURIComponent('Olá, Malu! Gostaria de conversar sobre um projeto.')}`} target="_blank" rel="noreferrer">
                  <Icon name="whatsapp" size={22} /> Conversar pelo WhatsApp
                </a>
                <a className="button button-outline" href="mailto:maluagro@gmail.com">
                  <Icon name="mail" size={21} /> Enviar um e-mail
                </a>
              </div>
            </div>
            <address className="contact-details reveal">
              <ContactItem icon="whatsapp" label="WhatsApp"><a href={WHATSAPP} target="_blank" rel="noreferrer">(15) 99615-4429</a></ContactItem>
              <ContactItem icon="mail" label="E-mail"><a href="mailto:maluagro@gmail.com">maluagro@gmail.com</a></ContactItem>
              <ContactItem icon="pin" label="Região">Tatuí e região · São Paulo</ContactItem>
            </address>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <div className="footer-brand"><strong>Malu Alves</strong><span>Engenheira Agrônoma</span></div>
          <p>© {new Date().getFullYear()} Malu Alves. Todos os direitos reservados.</p>
          <a href={`${BASE}curriculo.pdf`} download className="resume-link">Baixar currículo em PDF <Icon name="arrow" size={18} /></a>
        </div>
      </footer>

      <a className="whatsapp-float" href={`${WHATSAPP}?text=${encodeURIComponent('Olá, Malu! Conheci seu trabalho pelo site.')}`} target="_blank" rel="noreferrer" aria-label="Conversar com Malu pelo WhatsApp">
        <Icon name="whatsapp" size={28} /><span>Fale comigo</span>
      </a>

      {lightbox !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Foto ampliada: ${gallery[lightbox].title}`} onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Fechar galeria"><Icon name="close" /></button>
          <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
            <img src={gallery[lightbox].src} alt={gallery[lightbox].alt} />
            <div><small>{gallery[lightbox].subtitle}</small><strong>{gallery[lightbox].title}</strong></div>
          </div>
        </div>
      )}
    </>
  )
}

function TimelineItem({ label, title, detail }: { label: string; title: string; detail: string }) {
  return (
    <article className="timeline-item reveal">
      <span className="timeline-dot"><Icon name="hex" size={16} /></span>
      <small>{label}</small><h3>{title}</h3><p>{detail}</p>
    </article>
  )
}

function ContactItem({ icon, label, children }: { icon: string; label: string; children: ReactNode }) {
  return (
    <div className="contact-item">
      <span><Icon name={icon} size={23} /></span>
      <div><small>{label}</small><strong>{children}</strong></div>
    </div>
  )
}
