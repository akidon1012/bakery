import './Select.scss';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>

export default function Select(props: SelectProps) {
  return (
    <span className='select-wrap'>
      <select {...props} />
    </span>
  )
}
