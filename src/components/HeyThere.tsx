export interface HeyThereProps {
  name?: string;
}

const HeyThere = (props: HeyThereProps) => {
  return (
    <div className='text-xl font-bold text-red-500'>
      {`Hey ${props?.name ? props?.name : 'there' }`}
    </div>
  )
}

export default HeyThere
