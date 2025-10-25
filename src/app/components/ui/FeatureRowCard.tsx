"use client"
import { Icon } from '@iconify/react/dist/iconify.js'

export type FeatureRowColor = 'green' | 'blue' | 'primary' | 'secondary'

export default function FeatureRowCard({
  icon,
  title,
  desc,
  color = 'primary',
  className = '',
}: {
  icon: string
  title: string
  desc?: string
  color?: FeatureRowColor
  className?: string
}) {
  const palette =
    color === 'green'
      ? {
          ring: 'ring-1 ring-green-500/20',
          bg: 'bg-green-500/10',
          grad: 'from-green-500 to-emerald-400',
        }
      : color === 'blue'
      ? {
          ring: 'ring-1 ring-blue-500/20',
          bg: 'bg-blue-500/10',
          grad: 'from-blue-500 to-cyan-400',
        }
      : color === 'secondary'
      ? {
          ring: 'ring-1 ring-secondary/20',
          bg: 'bg-secondary/10',
          grad: 'from-secondary to-primary',
        }
      : {
          ring: 'ring-1 ring-primary/20',
          bg: 'bg-primary/10',
          grad: 'from-primary to-secondary',
        }

  return (
    <div className={`rounded-xl p-5 ${palette.bg} ${palette.ring} text-white flex items-start gap-4 ${className}`}>
      <div className={`rounded-full p-2.5 w-12 h-12 bg-gradient-to-r ${palette.grad} flex items-center justify-center shrink-0`}>
        <Icon icon={icon} className='text-white text-2xl' />
      </div>
      <div>
        <h5 className='font-medium text-white mb-1.5'>{title}</h5>
        {desc ? <p className='leading-relaxed text-white/90 text-sm'>{desc}</p> : null}
      </div>
    </div>
  )
}
