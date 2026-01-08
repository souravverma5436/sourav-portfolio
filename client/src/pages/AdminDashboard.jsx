import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const AdminDashboard = () => {
  const [stats, setStats] = useState(null)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    status: 'all',
    service: 'all',
    search: '',
    page: 1
  })
  const [pagination, setPagination] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      navigate('/admin/login')
      return
    }

    // Set default axios header
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    
    fetchStats()
    fetchMessages()
  }, [filters])

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/admin/stats')
      setStats(response.data.data)
    } catch (error) {
      console.error('Error fetching stats:', error)
      if (error.response?.status === 401) {
        handleLogout()
      }
    }
  }

  const fetchMessages = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'all') params.append(key, value)
      })

      const response = await axios.get(`/api/admin/messages?${params}`)
      setMessages(response.data.data.messages)
      setPagination(response.data.data.pagination)
    } catch (error) {
      console.error('Error fetching messages:', error)
      if (error.response?.status === 401) {
        handleLogout()
      }
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (messageId, newStatus) => {
    try {
      await axios.patch(`/api/admin/messages/${messageId}/status`, {
        status: newStatus
      })
      toast.success('Status updated successfully')
      fetchMessages()
      fetchStats()
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('Failed to update status')
    }
  }

  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm('Are you sure you want to delete this message?')) {
      return
    }

    try {
      await axios.delete(`/api/admin/messages/${messageId}`)
      toast.success('Message deleted successfully')
      fetchMessages()
      fetchStats()
    } catch (error) {
      console.error('Error deleting message:', error)
      toast.error('Failed to delete message')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    delete axios.defaults.headers.common['Authorization']
    navigate('/admin/login')
  }

  const StatCard = ({ title, value, color, icon }) => (
    <motion.div
      className="glass rounded-2xl p-6 card-hover cursor-hover"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
        </div>
        <div className={`text-4xl ${color}`}>{icon}</div>
      </div>
    </motion.div>
  )

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'text-yellow-400 bg-yellow-400/20'
      case 'read': return 'text-blue-400 bg-blue-400/20'
      case 'replied': return 'text-green-400 bg-green-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="text-4xl font-bold text-gradient">Admin Dashboard</h1>
            <p className="text-gray-400 mt-2">Manage your portfolio messages</p>
          </div>
          <button
            onClick={handleLogout}
            className="btn-secondary cursor-hover"
          >
            Logout
          </button>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Messages"
            value={stats.totalMessages}
            color="text-primary"
            icon="📧"
          />
          <StatCard
            title="New Messages"
            value={stats.newMessages}
            color="text-yellow-400"
            icon="🆕"
          />
          <StatCard
            title="Read Messages"
            value={stats.readMessages}
            color="text-blue-400"
            icon="👁️"
          />
          <StatCard
            title="Recent (7 days)"
            value={stats.recentMessages}
            color="text-green-400"
            icon="📈"
          />
        </div>

        {/* Filters */}
        <motion.div
          className="glass rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
                className="w-full px-3 py-2 bg-dark-lighter border border-gray-600 rounded-lg focus:border-primary focus:outline-none cursor-hover"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Service</label>
              <select
                value={filters.service}
                onChange={(e) => setFilters({ ...filters, service: e.target.value, page: 1 })}
                className="w-full px-3 py-2 bg-dark-lighter border border-gray-600 rounded-lg focus:border-primary focus:outline-none cursor-hover"
              >
                <option value="all">All Services</option>
                <option value="Logo Design">Logo Design</option>
                <option value="Branding">Branding</option>
                <option value="Social Media Creatives">Social Media</option>
                <option value="Posters & Ads">Posters & Ads</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Search</label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
                placeholder="Search by name, email, or message..."
                className="w-full px-3 py-2 bg-dark-lighter border border-gray-600 rounded-lg focus:border-primary focus:outline-none cursor-hover"
              />
            </div>
          </div>
        </motion.div>

        {/* Messages Table */}
        <motion.div
          className="glass rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-semibold">Messages</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-400">Loading messages...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-400">No messages found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-dark-lighter">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {messages.map((message) => (
                    <motion.tr
                      key={message._id}
                      className="hover:bg-dark-lighter/50 transition-colors"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-white">{message.name}</div>
                          <div className="text-sm text-gray-400">{message.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-primary/20 text-primary rounded-full text-xs">
                          {message.service}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs truncate text-gray-300">
                          {message.message}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={message.status}
                          onChange={(e) => handleStatusUpdate(message._id, e.target.value)}
                          className={`px-2 py-1 rounded-full text-xs border-0 cursor-hover ${getStatusColor(message.status)}`}
                        >
                          <option value="new">New</option>
                          <option value="read">Read</option>
                          <option value="replied">Replied</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {new Date(message.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDeleteMessage(message._id)}
                          className="text-red-400 hover:text-red-300 cursor-hover"
                        >
                          🗑️
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="p-6 border-t border-gray-700 flex justify-between items-center">
              <div className="text-sm text-gray-400">
                Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
                {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                {pagination.total} results
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilters({ ...filters, page: pagination.page - 1 })}
                  disabled={pagination.page === 1}
                  className="px-3 py-1 bg-dark-lighter rounded cursor-hover disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setFilters({ ...filters, page: pagination.page + 1 })}
                  disabled={pagination.page === pagination.pages}
                  className="px-3 py-1 bg-dark-lighter rounded cursor-hover disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default AdminDashboard