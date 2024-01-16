import { useIsMutating, useMutation } from '@tanstack/react-query';

export function PersistMutating() {
  const mutation = useMutation({
    mutationKey: ['mutating'],
    mutationFn: () => new Promise((resolve) => setTimeout(resolve, 5000)),
  });

  const mutating = useIsMutating({
    mutationKey: ['mutating'],
    status: 'pending',
  });

  return (
    <button
      type="button"
      disabled={!!mutating}
      className="px-3 py-2 text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={() => mutation.mutate()}
    >
      Mutate for 5 seconds
    </button>
  );
}
