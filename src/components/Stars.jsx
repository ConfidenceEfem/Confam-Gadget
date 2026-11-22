import { Star } from './Icons.jsx';
export default function Stars({ value, count }) {
  return (
    <span className="stars" aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => <Star key={i} filled={value >= i - 0.35} />)}
      {count != null && <small>({count})</small>}
    </span>
  );
}
