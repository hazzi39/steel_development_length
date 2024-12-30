export function createResultsTable(results) {
  return `
    <table class="min-w-full divide-y divide-gray-200 mt-4">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">dᵦ</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">f'c</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">fsy</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">cd</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">k₁</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">k₂</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">k₃</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lsy.t</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        ${results.map(result => `
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              ${new Date(result.timestamp).toLocaleString()}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${result.db}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${result.fc}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${result.fsy}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${result.cd}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${result.k1}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${result.k2}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${result.k3}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${result.lsyt} mm</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}