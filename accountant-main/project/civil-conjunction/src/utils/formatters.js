// Format currency in Indonesian Rupiah
export function formatCurrency(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
}

// Format date to Indonesian format
export function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
}

// Get color class for project status
export function getStatusColor(status) {
  switch (status) {
    case 'not-started':
      return 'bg-status-notStarted';
    case 'in-progress':
      return 'bg-status-inProgress';
    case 'completed':
      return 'bg-status-completed';
    default:
      return 'bg-gray-500';
  }
}

// Get text for project status
export function getStatusText(status) {
  switch (status) {
    case 'not-started':
      return 'Belum Dimulai';
    case 'in-progress':
      return 'Proses';
    case 'completed':
      return 'Selesai';
    default:
      return 'Unknown';
  }
}

// Calculate profit for a project
export function calculateProfit(revenue, expenses) {
  return revenue - expenses;
}