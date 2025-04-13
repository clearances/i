// /pages/[username].js
import { useRouter } from 'next/router';

export default function ProfilePage() {
  const router = useRouter();
  const { username } = router.query;

  return (
    <div>
      <h1>{username}'s Profile</h1>
      <p>Welcome to your profile page!</p>
    </div>
  );
}
