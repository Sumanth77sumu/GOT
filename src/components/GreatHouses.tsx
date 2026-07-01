import { useEffect, useRef, useState, type MouseEvent, type CSSProperties } from 'react'
import './GreatHouses.css'

type House = {
  id: string
  name: string
  seat: string
  words: string
  region: string
  sigil: string
  colors: string[]
  accent: string
  description: string
  sigil_url: string
  bg: string
  borderColor: string
}

type ThronesApiCharacter = {
  id: number
  fullName: string
  title: string
  family: string
  imageUrl: string
}

type HouseMember = {
  id: number | string
  fullName: string
  title: string
  family: string
  imageUrl: string
  detail: string
}

const THRONES_CHARACTER_API = 'https://thronesapi.com/api/v2/Characters'

const HOUSES: House[] = [
  {
    id: 'stark',
    name: 'STARK',
    seat: 'Winterfell',
    words: '"Winter Is Coming"',
    region: 'The North',
    sigil: 'Grey Direwolf',
    colors: ['#6b7a8d', '#c8d4e0'],
    accent: '#8fafc4',
    description:
      'Wardens of the North, the Starks trace their blood to the First Men. Honour is their sword and the frozen wind their banner. They endure where others fall — patient as winter itself.',
    sigil_url: '/images/one.jpg',
    bg: 'linear-gradient(135deg, #0d1117 0%, #1a2332 60%, #0d1117 100%)',
    borderColor: '#4a6380',
  },
  {
    id: 'lannister',
    name: 'LANNISTER',
    seat: 'Casterly Rock',
    words: '"Hear Me Roar"',
    region: 'The Westerlands',
    sigil: 'Golden Lion',
    colors: ['#c9a84c', '#e8c97a'],
    accent: '#d4a84b',
    description:
      'The wealthiest house in Westeros. Their lion does not merely roar — it devours. Power is their birthright, gold their language, and debt a weapon they wield with surgical precision.',
    sigil_url: '/images/two.jpg',
    bg: 'linear-gradient(135deg, #1a1200 0%, #2a1f00 60%, #1a1200 100%)',
    borderColor: '#7a6130',
  },
  {
    id: 'targaryen',
    name: 'TARGARYEN',
    seat: 'Dragonstone',
    words: '"Fire and Blood"',
    region: 'The Crownlands',
    sigil: 'Three-Headed Dragon',
    colors: ['#c41e3a', '#ff4466'],
    accent: '#c0392b',
    description:
      'Blood of Old Valyria. They did not conquer Westeros — they burned it into submission. Dragon riders, dynasty builders, and the last of a world consumed by fire.',
    sigil_url: '/images/three.png',
    bg: 'linear-gradient(135deg, #1a0000 0%, #2d0a0a 60%, #1a0000 100%)',
    borderColor: '#7a1a1a',
  },
  {
    id: 'baratheon',
    name: 'BARATHEON',
    seat: "Storm's End",
    words: '"Ours Is The Fury"',
    region: 'The Stormlands',
    sigil: 'Crowned Black Stag',
    colors: ['#e8c97a', '#f5e6c8'],
    accent: '#c9a84c',
    description:
      'Born of storms, tempered by battle. The Baratheons seized the Iron Throne not through cunning but through iron will and a war hammer. Fury is not their weakness — it is their crown.',
    sigil_url: '/images/four.webp',
    bg: 'linear-gradient(135deg, #0a0a00 0%, #1f1c00 60%, #0a0a00 100%)',
    borderColor: '#5a5020',
  },
  {
    id: 'greyjoy',
    name: 'GREYJOY',
    seat: 'Pyke',
    words: '"We Do Not Sow"',
    region: 'The Iron Islands',
    sigil: 'Golden Kraken',
    colors: ['#d4af37', '#8b8b6b'],
    accent: '#b8a040',
    description:
      'Reavers of the sea. Iron men who bow to no king but the Drowned God. What they cannot make, they take. What they cannot take, they burn. The sea is their kingdom — all else is plunder.',
    sigil_url: '/images/five.jpg',
    bg: 'linear-gradient(135deg, #050810 0%, #0a1020 60%, #050810 100%)',
    borderColor: '#3a4a5a',
  },
  {
    id: 'tyrell',
    name: 'TYRELL',
    seat: 'Highgarden',
    words: '"Growing Strong"',
    region: 'The Reach',
    sigil: 'Golden Rose',
    colors: ['#4a7c3f', '#7ab648'],
    accent: '#5a9e48',
    description:
      'The richest lords of the Reach, whose roses feed the realm. Behind beauty and abundance lies a house of ruthless ambition — growing strong in gardens, and stronger still in schemes.',
    sigil_url: '/images/six.jpg',
    bg: 'linear-gradient(135deg, #030a00 0%, #0a1800 60%, #030a00 100%)',
    borderColor: '#2a4a20',
  },
]

const HOUSE_MEMBER_PRIORITY: Record<string, string[]> = {
  stark: ['Ned Stark', 'Catelyn Stark', 'Rob Stark', 'Jon Snow', 'Sansa Stark', 'Arya Stark', 'Brandon Stark'],
  lannister: ['Tywin Lannister', 'Cersei Lannister', 'Jamie Lannister', 'Tyrion Lannister', 'Joffrey Baratheon'],
  targaryen: ['Daenerys Targaryen', 'Viserys Targaryn', 'Khal Drogo'],
  baratheon: ['Robert Baratheon', 'Stannis Baratheon', 'Tommen Baratheon', 'Gendry Baratheon', 'Joffrey Baratheon'],
  greyjoy: ['Theon Greyjoy', 'Yara Greyjoy', 'Euron Greyjoy'],
  tyrell: ['Margaery Tyrell', 'Olenna Tyrell'],
}

const MEMBER_DETAILS: Record<string, string> = {
  'Ned Stark': 'The honour-bound Lord of Winterfell whose choices still echo through the North.',
  'Catelyn Stark': 'Lady of Winterfell, fierce in loyalty and shaped by the cost of family duty.',
  'Rob Stark': 'The Young Wolf, crowned by northern banners and tested by war too soon.',
  'Jon Snow': 'Raised at Winterfell, bound to the Wall, and drawn into the realm\'s oldest war.',
  'Sansa Stark': 'A survivor of courts and cages who learns to turn patience into power.',
  'Arya Stark': 'A restless daughter of Winterfell, sharpened by exile, vengeance, and survival.',
  'Brandon Stark': 'The broken heir whose sight reaches deeper than any lord\'s map.',
  'Tywin Lannister': 'Lord of Casterly Rock, architect of Lannister power and fear.',
  'Cersei Lannister': 'Queen, strategist, and keeper of a crown defended with wildfire resolve.',
  'Jamie Lannister': 'The Kingslayer, torn between oath, blood, and the man beneath the legend.',
  'Tyrion Lannister': 'A sharp mind in a brutal house, surviving by wit where swords would fail.',
  'Joffrey Baratheon': 'A young king with a borrowed name and a cruel appetite for command.',
  'Daenerys Targaryen': 'Last dragon queen of an exiled dynasty, carrying fire back toward Westeros.',
  'Viserys Targaryn': 'A beggar king haunted by a throne he believed was owed to him.',
  'Khal Drogo': 'A warlord whose alliance helps awaken the last dragons of House Targaryen.',
  'Robert Baratheon': 'The rebel king who won the throne with a hammer and lost peace to courtly decay.',
  'Stannis Baratheon': 'A hard claimant to the Iron Throne, ruled by duty and iron certainty.',
  'Tommen Baratheon': 'A gentle boy-king caught inside the machinery of crown and faith.',
  'Gendry Baratheon': 'A hidden stag of royal blood, forged in Flea Bottom and battle.',
  'Theon Greyjoy': 'A ward of Winterfell and son of Pyke, split between two impossible homes.',
  'Yara Greyjoy': 'Captain and claimant, carrying the ironborn will with a steadier hand.',
  'Euron Greyjoy': 'A storm at sea in human shape, dangerous, ambitious, and impossible to ignore.',
  'Margaery Tyrell': 'A queenly rose with political grace, charm, and a keen sense for power.',
  'Olenna Tyrell': 'The Queen of Thorns, whose soft garden manners hide a blade-sharp mind.',
}

const FALLBACK_MEMBERS: Record<string, HouseMember[]> = {
  stark: [
    ['Ned Stark', 'Lord of Winterfell', 'https://thronesapi.com/assets/images/ned-stark.jpg'],
    ['Catelyn Stark', 'Lady of Winterfell', 'https://thronesapi.com/assets/images/catelyn-stark.jpg'],
    ['Rob Stark', 'Lord of Winterfell', 'https://thronesapi.com/assets/images/robb-stark.jpg'],
    ['Jon Snow', 'King of the North', 'https://thronesapi.com/assets/images/jon-snow.jpg'],
    ['Sansa Stark', 'Lady of Winterfell', 'https://thronesapi.com/assets/images/sansa-stark.jpeg'],
    ['Arya Stark', 'No One', 'https://thronesapi.com/assets/images/arya-stark.jpg'],
  ].map(([fullName, title, imageUrl]) => ({
    id: fullName,
    fullName,
    title,
    family: 'House Stark',
    imageUrl,
    detail: MEMBER_DETAILS[fullName],
  })),
  lannister: [
    ['Tywin Lannister', 'Lord Paramount of Westerlands', 'https://thronesapi.com/assets/images/tywin-lannister.jpg'],
    ['Cersei Lannister', 'Lady of Casterly Rock', 'https://thronesapi.com/assets/images/cersei.jpg'],
    ['Jamie Lannister', 'Lord Commander of the Kingsguard', 'https://thronesapi.com/assets/images/jaime-lannister.jpg'],
    ['Tyrion Lannister', 'Hand of the Queen', 'https://thronesapi.com/assets/images/tyrion-lannister.jpg'],
    ['Joffrey Baratheon', 'Protector of the Realm', 'https://thronesapi.com/assets/images/joffrey.jpg'],
  ].map(([fullName, title, imageUrl]) => ({
    id: fullName,
    fullName,
    title,
    family: 'House Lannister',
    imageUrl,
    detail: MEMBER_DETAILS[fullName],
  })),
  targaryen: [
    ['Daenerys Targaryen', 'Mother of Dragons', 'https://thronesapi.com/assets/images/daenerys.jpg'],
    ['Viserys Targaryn', 'King Viserys III', 'https://thronesapi.com/assets/images/viserys-targaryan.jpg'],
    ['Khal Drogo', 'Khal', 'https://thronesapi.com/assets/images/khal-drogo.jpg'],
  ].map(([fullName, title, imageUrl]) => ({
    id: fullName,
    fullName,
    title,
    family: 'House Targaryen',
    imageUrl,
    detail: MEMBER_DETAILS[fullName],
  })),
  baratheon: [
    ['Robert Baratheon', 'King', 'https://thronesapi.com/assets/images/king-robert.jpg'],
    ['Stannis Baratheon', 'Lord of Dragonstone', 'https://thronesapi.com/assets/images/stannis.jpg'],
    ['Tommen Baratheon', 'Prince', 'https://thronesapi.com/assets/images/tommen.jpg'],
    ['Gendry Baratheon', 'Lord of Storm\'s End', 'https://thronesapi.com/assets/images/gendry.jpg'],
  ].map(([fullName, title, imageUrl]) => ({
    id: fullName,
    fullName,
    title,
    family: 'House Baratheon',
    imageUrl,
    detail: MEMBER_DETAILS[fullName],
  })),
  greyjoy: [
    ['Theon Greyjoy', 'Captain of Sea Bitch', 'https://thronesapi.com/assets/images/theon.jpg'],
    ['Yara Greyjoy', 'Lady of the Iron Islands', 'https://thronesapi.com/assets/images/yara-greyjoy.jpg'],
    ['Euron Greyjoy', 'King of the iron Islands', 'https://thronesapi.com/assets/images/euron-greyjoy.jpg'],
  ].map(([fullName, title, imageUrl]) => ({
    id: fullName,
    fullName,
    title,
    family: 'House Greyjoy',
    imageUrl,
    detail: MEMBER_DETAILS[fullName],
  })),
  tyrell: [
    ['Margaery Tyrell', 'Queen of the Seven Kingdoms', 'https://thronesapi.com/assets/images/margaery-tyrell.jpg'],
    ['Olenna Tyrell', 'Queen of Thorns', 'https://thronesapi.com/assets/images/olenna-tyrell.jpg'],
  ].map(([fullName, title, imageUrl]) => ({
    id: fullName,
    fullName,
    title,
    family: 'House Tyrell',
    imageUrl,
    detail: MEMBER_DETAILS[fullName],
  })),
}

const normalizeMemberName = (name: string) => name.toLowerCase().replace(/[^a-z]/g, '')

const getHouseMembers = (houseId: string, characters: ThronesApiCharacter[]) => {
  const priority = HOUSE_MEMBER_PRIORITY[houseId] ?? []
  const apiMembers = priority
    .map((name): HouseMember | null => {
      const normalizedName = normalizeMemberName(name)
      const character = characters.find((candidate) => normalizeMemberName(candidate.fullName) === normalizedName)

      if (!character) return null

      return {
        id: character.id,
        fullName: character.fullName,
        title: character.title,
        family: character.family,
        imageUrl: character.imageUrl,
        detail: MEMBER_DETAILS[name] ?? MEMBER_DETAILS[character.fullName] ?? 'A name written into the shifting histories of Westeros.',
      }
    })
    .filter((member): member is HouseMember => Boolean(member))

  return apiMembers.length ? apiMembers : FALLBACK_MEMBERS[houseId] ?? []
}

type HouseCardProps = {
  house: House
  index: number
  selected: boolean
  onSelect: (house: House) => void
}

const HouseCard = ({ house, index, selected, onSelect }: HouseCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const sigilRef = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 120)
          obs.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [index])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect || !sigilRef.current) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14
    sigilRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg) scale(1.06)`
  }

  const handleMouseLeave = () => {
    if (sigilRef.current) sigilRef.current.style.transform = ''
    setHovered(false)
  }

  return (
    <div
      ref={cardRef}
      className={`house-card house-card--${house.id} ${visible ? 'visible' : ''} ${selected ? 'house-card-selected' : ''}`}
      style={{
        '--accent': house.accent,
        '--border': house.borderColor,
        background: house.bg,
      } as CSSProperties}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={() => onSelect(house)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(house)
        }
      }}
    >
      <span className="corner corner-tl" />
      <span className="corner corner-tr" />
      <span className="corner corner-bl" />
      <span className="corner corner-br" />
      <div className="card-glow" />
      <div ref={sigilRef} className="house-sigil-wrap">
        {!imgError ? (
          <img
            className="house-sigil-img"
            src={house.sigil_url}
            alt={`House ${house.name} sigil`}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="house-sigil-fallback">{house.sigil[0]}</div>
        )}
        <div className="sigil-ring" />
      </div>
      <div className={`house-content ${hovered ? 'content-hidden' : ''}`}>
        <p className="house-region">{house.region}</p>
        <div className="house-divider">
          <span className="divider-line" />
          <span className="divider-diamond" />
          <span className="divider-line" />
        </div>
        <h2 className="house-name">HOUSE<br />{house.name}</h2>
        <p className="house-seat">{house.seat}</p>
        <p className="house-sigil-label">{house.sigil}</p>
      </div>
      <div className={`house-hover-content ${hovered ? 'hover-visible' : ''}`}>
        <p className="hover-words">{house.words}</p>
        <div className="house-divider hover-divider">
          <span className="divider-line" />
          <span className="divider-diamond" />
          <span className="divider-line" />
        </div>
        <h2 className="hover-name">HOUSE {house.name}</h2>
        <p className="hover-desc">{house.description}</p>
      </div>
      <div className="card-accent-bar" />
    </div>
  )
}

const GreatHouses = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const bloodlineRef = useRef<HTMLDivElement | null>(null)
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const subRef = useRef<HTMLParagraphElement | null>(null)
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null)
  const [characters, setCharacters] = useState<ThronesApiCharacter[]>([])
  const [membersLoading, setMembersLoading] = useState(true)
  const [membersError, setMembersError] = useState(false)

  useEffect(() => {
    const els = [headingRef.current, subRef.current].filter(Boolean)
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          els.forEach((el, i) => setTimeout(() => el?.classList.add('visible'), i * 150))
          obs.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    fetch(THRONES_CHARACTER_API, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch Thrones characters')
        return res.json() as Promise<ThronesApiCharacter[]>
      })
      .then((data) => {
        setCharacters(data)
        setMembersError(false)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setMembersError(true)
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setMembersLoading(false)
      })

    return () => controller.abort()
  }, [])

  const selectedMembers = selectedHouse ? getHouseMembers(selectedHouse.id, characters) : []
  const visibleMembers = selectedHouse
    ? selectedMembers.length ? selectedMembers : FALLBACK_MEMBERS[selectedHouse.id] ?? []
    : []

  const selectHouse = (house: House) => {
    if (selectedHouse?.id === house.id) {
      setSelectedHouse(null)
      return
    }

    setSelectedHouse(house)
  }

  useEffect(() => {
    if (!selectedHouse) return

    window.requestAnimationFrame(() => {
      bloodlineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [selectedHouse])

  return (
    <section ref={sectionRef} id="houses" className="section1">
      <div className="section1-bg-texture" />
      <div className="section1-bg-vignette" />
      <header className="section1-header">
        <p ref={subRef} className="section1-eyebrow fade-up">THE GREAT HOUSES OF WESTEROS</p>
        <div className="header-ornament">
          <span className="ornament-line" />
          <span className="ornament-rune">✦</span>
          <span className="ornament-line" />
        </div>
        <h1 ref={headingRef} className="section1-title fade-up">
          The Noble<br />
          <em>Houses</em>
        </h1>
        <p className="section1-subtitle fade-up">
          Seven kingdoms. Six great houses. One Iron Throne.
        </p>
      </header>
      <div className="houses-grid">
        {HOUSES.map((house, i) => (
          <HouseCard
            key={house.id}
            house={house}
            index={i}
            selected={selectedHouse?.id === house.id}
            onSelect={selectHouse}
          />
        ))}
      </div>
      {selectedHouse && (
        <div
          ref={bloodlineRef}
          className="bloodline-panel"
          style={{
            '--accent': selectedHouse.accent,
            '--border': selectedHouse.borderColor,
            background: selectedHouse.bg,
          } as CSSProperties}
        >
          <div className="bloodline-panel-glow" />
          <div className="bloodline-header">
            <p className="bloodline-kicker">{selectedHouse.region}</p>
            <h2 className="bloodline-title">House {selectedHouse.name} Bloodline</h2>
            <p className="bloodline-copy">{selectedHouse.words}</p>
            {membersError && (
              <p className="bloodline-status">Raven delayed. Showing preserved records.</p>
            )}
          </div>
          <div className="members-grid" aria-busy={membersLoading}>
            {(membersLoading ? FALLBACK_MEMBERS[selectedHouse.id] : visibleMembers).map((member) => (
              <article key={member.id} className="member-card">
                <div className="member-portrait-wrap">
                  <img className="member-portrait" src={member.imageUrl} alt={member.fullName} loading="lazy" />
                </div>
                <div className="member-scroll">
                  <p className="member-family">{member.family || `House ${selectedHouse.name}`}</p>
                  <h3 className="member-name">{member.fullName}</h3>
                  <p className="member-title">{member.title}</p>
                  <p className="member-detail">{member.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
      <div className="section1-footer-ornament">
        <span className="footer-line" />
        <span className="footer-sigil">⚔</span>
        <span className="footer-line" />
      </div>
    </section>
  )
}

export default GreatHouses
