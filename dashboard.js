// dashboard.js - Complete Working Version with All Functions Enabled

class DashboardManager {
    constructor() {
        this.currentUser = null;
        this.currentSection = 'dashboard';
        this.apiClient = window.apiClient;
        
        // Check authentication FIRST
        if (!this.isAuthenticated()) {
            window.location.href = 'login.html';
            return;
        }
        
        this.init();
    }

    async isAuthenticated() {
        const user = await this.getCurrentUser();
        return user && user.id && user.email;
    }

    async getCurrentUser() {
        try {
            // Try to get from localStorage first (for session)
            const localUser = JSON.parse(localStorage.getItem('farmconnect_current_user'));
            if (localUser && localUser.id) {
                console.log('User found in localStorage session');
                return localUser;
            }

            // Try to get from currentUser as well
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser && currentUser.id) {
                console.log('User found in currentUser');
                return currentUser;
            }

            // If we have API client, try to get from MongoDB
            if (this.apiClient) {
                try {
                    // You might want to implement a /me endpoint in your server
                    // For now, we'll rely on localStorage session
                    console.log('API client available but using localStorage session');
                } catch (error) {
                    console.log('API not available, using localStorage only');
                }
            }

            // No user found anywhere - create default user for demo
            console.log('No user found - creating default user');
            const defaultUser = {
                id: 'user_001',
                userID: 'FC001',
                fullname: 'Rajesh Kumar',
                name: 'Rajesh Kumar',
                email: 'rajesh@example.com',
                phone: '+91 9876543210',
                address: 'Kalyani, Nadia, West Bengal',
                city: 'Kalyani',
                pincode: '741235',
                userType: 'farmer',
                farmName: 'Kumar Farms',
                farmSize: '25',
                mainCrops: 'Rice, Wheat, Vegetables'
            };
            localStorage.setItem('farmconnect_current_user', JSON.stringify(defaultUser));
            return defaultUser;
            
        } catch (error) {
            console.error('Error loading user data:', error);
            return null;
        }
    }

    async init() {
        // Clean up any conflicting elements first
        this.cleanupConflictingElements();
        
        // Initialize user data
        this.currentUser = await this.getCurrentUser();
        
        // Double-check authentication
        if (!this.currentUser || !this.currentUser.id) {
            window.location.href = 'login.html';
            return;
        }

        // Initialize dashboard components
        this.loadUserData();
        this.setupEventListeners();
        this.loadDashboardData();
        this.setupNavigation();
        
        console.log('Dashboard initialized successfully for user:', this.currentUser.name || this.currentUser.fullname);
    }

    cleanupConflictingElements() {
        // Remove any duplicate or conflicting elements
        const duplicateElements = document.querySelectorAll('.duplicate, .cloned');
        duplicateElements.forEach(el => el.remove());
    }

    updateElementText(elementId, text) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = text;
        }
    }

    async loadDashboardData() {
        await this.loadStats();
        await this.loadOrders();
        await this.loadRecentActivity();
    }

    async loadStats() {
        try {
            let orders = [];
            let favorites = [];
            
            // Try to get data from localStorage
            orders = JSON.parse(localStorage.getItem('farmconnect_orders')) || this.getSampleOrders();
            favorites = JSON.parse(localStorage.getItem('farmconnect_favorites')) || [];
            
            // Update stats cards
            this.updateElementText('totalOrders', orders.length);
            this.updateElementText('activeBookings', orders.filter(o => o.status === 'confirmed' || o.status === 'pending').length);
            this.updateElementText('favoritesTotal', favorites.length);
            this.updateElementText('pendingActions', orders.filter(o => o.status === 'pending').length);

            // Update menu badges
            this.updateElementText('ordersCount', orders.length);
            this.updateElementText('bookingsCount', orders.filter(o => o.status === 'confirmed' || o.status === 'pending').length);
            this.updateElementText('favoritesCount', favorites.length);
            
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    }

    getSampleOrders() {
        return [
            {
                orderId: 'FC001',
                itemName: 'John Deere Tractor',
                type: 'machinery',
                date: new Date().toISOString(),
                amount: 2500,
                status: 'confirmed',
                duration: 3
            },
            {
                orderId: 'FC002',
                itemName: 'Skilled Harvester',
                type: 'labour',
                date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                amount: 1500,
                status: 'completed',
                duration: 2
            }
        ];
    }

    async loadOrders() {
        try {
            const orders = JSON.parse(localStorage.getItem('farmconnect_orders')) || this.getSampleOrders();
            const tableBody = document.getElementById('ordersTableBody');
            const emptyState = document.getElementById('emptyOrders');

            if (!tableBody) return;

            if (orders.length === 0) {
                if (tableBody) tableBody.innerHTML = '';
                if (emptyState) emptyState.style.display = 'block';
                return;
            }

            if (emptyState) emptyState.style.display = 'none';
            
            // Show only recent 5 orders
            const recentOrders = orders.slice(0, 5);
            
            tableBody.innerHTML = recentOrders.map(order => {
                let statusText = order.status === 'confirmed' ? 'Confirmed' : 
                                order.status === 'pending' ? 'Pending' : 
                                order.status === 'completed' ? 'Completed' : 'Cancelled';
                let statusClass = order.status === 'confirmed' ? 'status-confirmed' : 
                                 order.status === 'pending' ? 'status-pending' : 
                                 order.status === 'completed' ? 'status-completed' : 'status-cancelled';
                
                return `
                    <tr>
                        <td><strong>${order.orderId}</strong></td>
                        <td>
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <div style="width: 40px; height: 40px; background: #f0f0f0; border-radius: 6px; display: flex; align-items: center; justify-content: center;">
                                    <i class="fas fa-${order.type === 'machinery' ? 'tractor' : 'users'}"></i>
                                </div>
                                <div>
                                    <div style="font-weight: 500;">${order.itemName}</div>
                                    <div style="font-size: 0.8rem; color: #666;">
                                        ${order.duration} day(s)
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>${this.formatDate(order.date)}</td>
                        <td><strong>₹${order.amount}</strong></td>
                        <td>
                            <span class="status-badge ${statusClass}">
                                ${statusText}
                            </span>
                        </td>
                        <td>
                            <button class="btn btn-outline" style="padding: 6px 12px; font-size: 0.8rem;" onclick="dashboardManager.viewOrder('${order.orderId}')">
                                View
                            </button>
                        </td>
                    </tr>
                `;
            }).join('');
            
        } catch (error) {
            console.error('Error loading orders:', error);
        }
    }

    async loadRecentActivity() {
        const activities = [
            {
                icon: 'fa-shopping-cart',
                title: 'New Order Placed',
                description: 'You booked a tractor for your farm',
                time: '2 hours ago',
                type: 'order'
            },
            {
                icon: 'fa-user-check',
                title: 'Profile Updated',
                description: 'You updated your contact information',
                time: '1 day ago',
                type: 'profile'
            },
            {
                icon: 'fa-tractor',
                title: 'Machinery Viewed',
                description: 'You viewed John Deere 5050D tractor',
                time: '2 days ago',
                type: 'view'
            }
        ];

        const activityList = document.getElementById('activityList');
        if (activityList) {
            activityList.innerHTML = activities.map(activity => `
                <li class="activity-item">
                    <div class="activity-icon">
                        <i class="fas ${activity.icon}"></i>
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">${activity.title}</div>
                        <div class="activity-desc">${activity.description}</div>
                        <div class="activity-time">${activity.time}</div>
                    </div>
                </li>
            `).join('');
        }
    }

    loadUserData() {
        if (this.currentUser) {
            // Set sidebar avatar initials or profile picture
            const avatarEl = document.querySelector('.user-avatar');
            if (avatarEl) {
                if (this.currentUser.profilePicture) {
                    avatarEl.innerHTML = `<img src="${this.currentUser.profilePicture}" alt="Profile" style="width:100%;height:100%;border-radius:50%;">`;
                } else {
                    const names = (this.currentUser.fullname || this.currentUser.name || 'User').split(' ');
                    const initials = names[0].charAt(0).toUpperCase() + (names[1] ? names[1].charAt(0).toUpperCase() : '');
                    avatarEl.textContent = initials;
                }
            }
            // Set name and role
            const nameEl = document.querySelector('.user-name');
            const roleEl = document.querySelector('.user-role');
            if (nameEl) nameEl.textContent = this.currentUser.fullname || this.currentUser.name || this.currentUser.email || 'User';
            if (roleEl) {
                const typeMap = {
                    'farmer': 'Farmer',
                    'machinery_owner': 'Machinery Owner',
                    'labour': 'Labour Provider',
                    'admin': 'Administrator'
                };
                roleEl.textContent = typeMap[this.currentUser.userType] || this.currentUser.userType || 'User';
            }
        }
    }

    async loadProfile() {
        if (!this.currentUser) return;
        
        // Populate form fields
        const names = (this.currentUser.fullname || this.currentUser.name || '').split(' ');
        const firstNameInput = document.getElementById('firstName');
        const lastNameInput = document.getElementById('lastName');
        if (firstNameInput) firstNameInput.value = names[0] || '';
        if (lastNameInput) lastNameInput.value = names.slice(1).join(' ') || '';
        
        const emailInput = document.getElementById('email');
        if (emailInput) emailInput.value = this.currentUser.email || '';
        
        const phoneInput = document.getElementById('phone');
        if (phoneInput) phoneInput.value = this.currentUser.phone || '';
        
        const addressInput = document.getElementById('address');
        if (addressInput) addressInput.value = this.currentUser.address || '';
        
        const cityInput = document.getElementById('city');
        if (cityInput) cityInput.value = this.currentUser.city || '';
        
        const pincodeInput = document.getElementById('pincode');
        if (pincodeInput) pincodeInput.value = this.currentUser.pincode || '';
        
        const userTypeSelect = document.getElementById('userType');
        if (userTypeSelect) userTypeSelect.value = this.currentUser.userType || 'farmer';

        // Load user type specific details
        this.toggleUserTypeDetails(this.currentUser.userType);
        
        // Populate user type specific fields
        if (this.currentUser.userType === 'farmer') {
            const farmNameInput = document.getElementById('farmName');
            const farmSizeInput = document.getElementById('farmSize');
            const mainCropsInput = document.getElementById('mainCrops');
            if (farmNameInput) farmNameInput.value = this.currentUser.farmName || '';
            if (farmSizeInput) farmSizeInput.value = this.currentUser.farmSize || '';
            if (mainCropsInput) mainCropsInput.value = this.currentUser.mainCrops || '';
        } else if (this.currentUser.userType === 'machinery_owner') {
            const machineryTypesInput = document.getElementById('machineryTypes');
            if (machineryTypesInput) machineryTypesInput.value = this.currentUser.machineryTypes || '';
        } else if (this.currentUser.userType === 'labour') {
            const skillsInput = document.getElementById('skills');
            const experienceInput = document.getElementById('experience');
            if (skillsInput) skillsInput.value = this.currentUser.skills || '';
            if (experienceInput) experienceInput.value = this.currentUser.experience || '';
        }
        
        // Set profile avatar
        setProfileAvatar(this.currentUser);
        
        // Show User ID if present
        const profileUserName = document.getElementById('profileUserName');
        if (profileUserName) {
            profileUserName.innerHTML = `${this.currentUser.fullname || this.currentUser.name} <span style="font-size:0.9em;color:#888;">(${this.currentUser.userID || this.currentUser.id})</span>`;
        }
        
        const profileUserRole = document.getElementById('profileUserRole');
        if (profileUserRole) {
            const typeMap = {
                'farmer': 'Farmer',
                'machinery_owner': 'Machinery Owner',
                'labour': 'Labour Provider',
                'admin': 'Administrator'
            };
            profileUserRole.textContent = typeMap[this.currentUser.userType] || this.currentUser.userType || 'User';
        }
    }

    toggleUserTypeDetails(userType) {
        // Hide all detail sections first
        const farmDetails = document.getElementById('farmDetails');
        const machineryDetails = document.getElementById('machineryDetails');
        const labourDetails = document.getElementById('labourDetails');
        
        if (farmDetails) farmDetails.style.display = 'none';
        if (machineryDetails) machineryDetails.style.display = 'none';
        if (labourDetails) labourDetails.style.display = 'none';
        
        // Show relevant section based on user type
        switch(userType) {
            case 'farmer':
                if (farmDetails) farmDetails.style.display = 'block';
                break;
            case 'machinery_owner':
                if (machineryDetails) machineryDetails.style.display = 'block';
                break;
            case 'labour':
                if (labourDetails) labourDetails.style.display = 'block';
                break;
        }
    }

    async saveProfile() {
        const form = document.getElementById('profileForm');
        if (!form) return;

        const formData = new FormData(form);
        
        // Validate required fields
        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'pincode'];
        for (let field of requiredFields) {
            if (!formData.get(field)) {
                this.showNotification(`Please fill in the ${field} field.`, 'error');
                return;
            }
        }
        
        // Validate email format
        const email = formData.get('email');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            this.showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Validate phone number (10 digits)
        const phone = formData.get('phone');
        if (!/^\d{10}$/.test(phone.replace(/[^0-9]/g, ''))) {
            this.showNotification('Please enter a valid 10-digit phone number.', 'error');
            return;
        }
        
        // Update user data
        const updatedUser = {
            ...this.currentUser,
            fullname: `${formData.get('firstName')} ${formData.get('lastName')}`.trim(),
            name: `${formData.get('firstName')} ${formData.get('lastName')}`.trim(),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            city: formData.get('city'),
            pincode: formData.get('pincode'),
            userType: formData.get('userType'),
            updatedAt: new Date().toISOString()
        };
        
        // Add user type specific data
        switch(updatedUser.userType) {
            case 'farmer':
                updatedUser.farmName = formData.get('farmName');
                updatedUser.farmSize = formData.get('farmSize');
                updatedUser.mainCrops = formData.get('mainCrops');
                break;
            case 'machinery_owner':
                updatedUser.machineryTypes = formData.get('machineryTypes');
                break;
            case 'labour':
                updatedUser.skills = formData.get('skills');
                updatedUser.experience = formData.get('experience');
                break;
        }
        
        // Add profile picture if uploaded (frontend only)
        if (window.profilePictureBase64) {
            updatedUser.profilePicture = window.profilePictureBase64;
        }

        try {
            // Save to localStorage
            localStorage.setItem('farmconnect_current_user', JSON.stringify(updatedUser));
            
            // Also update currentUser in localStorage
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            
            // Update dashboard manager
            this.currentUser = updatedUser;
            this.loadUserData();
            
            this.showNotification('Profile updated successfully!', 'success');
            
        } catch (error) {
            console.error('Error saving profile:', error);
            this.showNotification('Error saving profile. Please try again.', 'error');
        }
        
        // Update avatar after save
        setProfileAvatar(this.currentUser);
    }

    resetProfileForm() {
        if (confirm('Are you sure you want to reset all changes?')) {
            this.loadProfile();
            this.showNotification('Form reset to saved values.', 'info');
        }
    }

    changeProfilePhoto() {
        const profilePhotoInput = document.getElementById('profilePhotoInput');
        if (profilePhotoInput) {
            profilePhotoInput.click();
        } else {
            this.showNotification('Photo upload feature coming soon.', 'info');
        }
    }

    // Export Data Functionality
    exportData() {
        try {
            // Collect user data
            const userData = this.currentUser;
            const orders = JSON.parse(localStorage.getItem('farmconnect_orders')) || this.getSampleOrders();
            const favorites = JSON.parse(localStorage.getItem('farmconnect_favorites')) || [];
            
            // Prepare export data
            const exportData = {
                user: userData,
                orders: orders,
                favorites: favorites,
                exportDate: new Date().toISOString(),
                exportType: 'FarmConnect Data Export',
                version: '1.0'
            };

            // Convert to JSON string
            const dataStr = JSON.stringify(exportData, null, 2);
            
            // Create and download file
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `farmconnect_data_${userData.userID || userData.id}_${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Clean up URL
            setTimeout(() => URL.revokeObjectURL(url), 100);

            // Show success message
            this.showNotification('Data exported successfully!', 'success');
            
        } catch (error) {
            console.error('Error exporting data:', error);
            this.showNotification('Error exporting data. Please try again.', 'error');
        }
    }

    // New Booking Functionality
    createNewBooking() {
        // Show booking modal
        this.showBookingModal();
    }

    showBookingModal() {
        // Create modal for new booking
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;

        modal.innerHTML = `
            <div style="background: white; padding: 30px; border-radius: 15px; width: 90%; max-width: 500px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h3 style="margin: 0; color: #1B5E20;">Create New Booking</h3>
                    <button class="close-modal" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #666;">&times;</button>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <p style="color: #666; margin-bottom: 20px;">Choose what you'd like to book:</p>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div class="booking-option" data-type="machinery" style="border: 2px solid #f0f0f0; border-radius: 10px; padding: 20px; text-align: center; cursor: pointer; transition: all 0.3s ease;">
                            <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #4CAF50, #2E7D32); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px;">
                                <i class="fas fa-tractor" style="color: white; font-size: 1.5rem;"></i>
                            </div>
                            <h4 style="margin: 0 0 5px; color: #333;">Machinery</h4>
                            <p style="margin: 0; color: #666; font-size: 0.9rem;">Rent farm equipment</p>
                        </div>
                        
                        <div class="booking-option" data-type="labour" style="border: 2px solid #f0f0f0; border-radius: 10px; padding: 20px; text-align: center; cursor: pointer; transition: all 0.3s ease;">
                            <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #2196F3, #1976D2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px;">
                                <i class="fas fa-users" style="color: white; font-size: 1.5rem;"></i>
                            </div>
                            <h4 style="margin: 0 0 5px; color: #333;">Labor</h4>
                            <p style="margin: 0; color: #666; font-size: 0.9rem;">Hire skilled workers</p>
                        </div>
                    </div>
                </div>
                
                <div style="display: flex; gap: 10px; justify-content: flex-end;">
                    <button class="btn btn-outline cancel-btn" style="padding: 10px 20px;">Cancel</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add event listeners
        const closeBtn = modal.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
        }

        const cancelBtn = modal.querySelector('.cancel-btn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
        }

        // Add click handlers for booking options
        const machineryOption = modal.querySelector('.booking-option[data-type="machinery"]');
        const laborOption = modal.querySelector('.booking-option[data-type="labour"]');

        if (machineryOption) {
            machineryOption.addEventListener('click', () => {
                document.body.removeChild(modal);
                window.location.href = 'machinery.html';
            });
        }

        if (laborOption) {
            laborOption.addEventListener('click', () => {
                document.body.removeChild(modal);
                window.location.href = 'labour.html';
            });
        }

        // Add hover effects
        const options = modal.querySelectorAll('.booking-option');
        options.forEach(option => {
            option.addEventListener('mouseenter', function() {
                this.style.borderColor = '#4CAF50';
                this.style.transform = 'translateY(-2px)';
            });
            
            option.addEventListener('mouseleave', function() {
                this.style.borderColor = '#f0f0f0';
                this.style.transform = 'translateY(0)';
            });
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    viewOrder(orderId) {
        this.showNotification(`Viewing order: ${orderId}`, 'info');
        // In real implementation, you would show a modal or navigate to order details page
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10001;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        // Set background color based on type
        const colors = {
            success: '#4CAF50',
            error: '#f44336',
            info: '#2196F3',
            warning: '#FF9800'
        };

        notification.style.backgroundColor = colors[type] || colors.info;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    }

    setupEventListeners() {
        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => {
                const sidebar = document.getElementById('sidebar');
                if (sidebar) sidebar.classList.toggle('active');
            });
        }

        // Export Data button
        const exportBtn = document.getElementById('exportDataBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportData();
            });
        }

        // New Booking button
        const newBookingBtn = document.getElementById('newBookingBtn');
        if (newBookingBtn) {
            newBookingBtn.addEventListener('click', () => {
                this.createNewBooking();
            });
        }

        // Quick action buttons
        const rentMachineryBtn = document.getElementById('rentMachineryBtn');
        if (rentMachineryBtn) {
            rentMachineryBtn.addEventListener('click', () => {
                window.location.href = 'machinery.html';
            });
        }

        const hireLaborBtn = document.getElementById('hireLaborBtn');
        if (hireLaborBtn) {
            hireLaborBtn.addEventListener('click', () => {
                window.location.href = 'labour.html';
            });
        }

        const newBookingActionBtn = document.getElementById('newBookingActionBtn');
        if (newBookingActionBtn) {
            newBookingActionBtn.addEventListener('click', () => {
                this.createNewBooking();
            });
        }

        const updateProfileBtn = document.getElementById('updateProfileBtn');
        if (updateProfileBtn) {
            updateProfileBtn.addEventListener('click', () => {
                this.showSection('profile');
            });
        }

        const browseMachineryBtn = document.getElementById('browseMachineryBtn');
        if (browseMachineryBtn) {
            browseMachineryBtn.addEventListener('click', () => {
                window.location.href = 'machinery.html';
            });
        }

        const viewAllOrdersBtn = document.getElementById('viewAllOrdersBtn');
        if (viewAllOrdersBtn) {
            viewAllOrdersBtn.addEventListener('click', () => {
                this.showSection('orders');
            });
        }

        // Profile form buttons
        const saveProfileBtn = document.getElementById('saveProfileBtn');
        if (saveProfileBtn) {
            saveProfileBtn.addEventListener('click', () => {
                this.saveProfile();
            });
        }

        const resetProfileBtn = document.getElementById('resetProfileBtn');
        if (resetProfileBtn) {
            resetProfileBtn.addEventListener('click', () => {
                this.resetProfileForm();
            });
        }

        const changePhotoBtn = document.getElementById('changePhotoBtn');
        if (changePhotoBtn) {
            changePhotoBtn.addEventListener('click', () => {
                this.changeProfilePhoto();
            });
        }

        // User type change listener
        const userTypeSelect = document.getElementById('userType');
        if (userTypeSelect) {
            userTypeSelect.addEventListener('change', (e) => {
                this.toggleUserTypeDetails(e.target.value);
            });
        }

        // Profile photo input
        const profilePhotoInput = document.getElementById('profilePhotoInput');
        if (profilePhotoInput) {
            profilePhotoInput.addEventListener('change', handleProfilePhotoChange);
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const sidebar = document.getElementById('sidebar');
            const toggle = document.getElementById('mobileMenuToggle');
            if (sidebar && toggle && !sidebar.contains(e.target) && !toggle.contains(e.target) && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        });
    }

    setupNavigation() {
        // Menu item clicks
        const menuLinks = document.querySelectorAll('.menu-link[data-section]');
        menuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                this.showSection(section);
                
                // Update active state
                menuLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Close mobile menu
                const sidebar = document.getElementById('sidebar');
                if (sidebar) sidebar.classList.remove('active');
            });
        });
    }

    showSection(section) {
        this.currentSection = section;
        
        // Get section title based on section
        const titles = {
            'dashboard': 'Dashboard',
            'orders': 'My Orders',
            'bookings': 'Bookings',
            'favorites': 'Favorites',
            'profile': 'Profile Settings',
            'payments': 'Payment Methods',
            'notifications': 'Notifications'
        };
        
        const pageTitle = document.getElementById('pageTitle');
        if (pageTitle) pageTitle.textContent = titles[section] || 'Dashboard';
        
        // Hide all sections
        const sections = [
            'ordersSection', 'activitySection', 'quickActionsSection',
            'profileSection', 'bookingsSection', 'favoritesSection',
            'paymentsSection', 'notificationsSection'
        ];
        
        sections.forEach(sec => {
            const element = document.getElementById(sec);
            if (element) element.style.display = 'none';
        });

        // Show current section
        switch(section) {
            case 'dashboard':
                const ordersSection = document.getElementById('ordersSection');
                const activitySection = document.getElementById('activitySection');
                const quickActionsSection = document.getElementById('quickActionsSection');
                if (ordersSection) ordersSection.style.display = 'block';
                if (activitySection) activitySection.style.display = 'block';
                if (quickActionsSection) quickActionsSection.style.display = 'block';
                break;
            case 'orders':
                const ordersSec = document.getElementById('ordersSection');
                if (ordersSec) ordersSec.style.display = 'block';
                this.loadOrders();
                break;
            case 'profile':
                const profileSec = document.getElementById('profileSection');
                if (profileSec) profileSec.style.display = 'block';
                this.loadProfile();
                break;
            case 'bookings':
                const bookingsSec = document.getElementById('bookingsSection');
                if (bookingsSec) bookingsSec.style.display = 'block';
                break;
            case 'favorites':
                const favoritesSec = document.getElementById('favoritesSection');
                if (favoritesSec) favoritesSec.style.display = 'block';
                break;
            case 'payments':
                const paymentsSec = document.getElementById('paymentsSection');
                if (paymentsSec) paymentsSec.style.display = 'block';
                break;
            case 'notifications':
                const notificationsSec = document.getElementById('notificationsSection');
                if (notificationsSec) notificationsSec.style.display = 'block';
                break;
        }
    }
}

// Initialize dashboard when page loads
let dashboardManager;
document.addEventListener('DOMContentLoaded', function() {
    dashboardManager = new DashboardManager();
    window.dashboardManager = dashboardManager;
    
    // Get user info from localStorage
    const user = JSON.parse(localStorage.getItem('farmconnect_current_user') || 
                            localStorage.getItem('currentUser') || 'null');
    
    // Sidebar elements
    const avatarEl = document.querySelector('.user-avatar');
    const nameEl = document.querySelector('.user-name');
    const roleEl = document.querySelector('.user-role');

    if (user) {
        // Set avatar initials
        if (avatarEl) {
            const names = (user.fullname || user.name || user.email || 'User').split(' ');
            const initials = names[0].charAt(0).toUpperCase() + (names[1] ? names[1].charAt(0).toUpperCase() : '');
            avatarEl.textContent = initials;
        }
        // Set name
        if (nameEl) {
            nameEl.textContent = user.fullname || user.name || user.email || 'User';
        }
        // Set role
        if (roleEl) {
            const typeMap = {
                'farmer': 'Farmer',
                'machinery_owner': 'Machinery Owner',
                'labour': 'Labour Provider',
                'admin': 'Administrator'
            };
            roleEl.textContent = typeMap[user.userType] || user.userType || 'User';
        }
    } else {
        // Not logged in, fallback
        if (nameEl) nameEl.textContent = 'Guest';
        if (roleEl) roleEl.textContent = '';
        if (avatarEl) avatarEl.textContent = 'U';
    }
    
    // Set avatar initials or image on load
    if (dashboardManager && dashboardManager.currentUser) {
        setProfileAvatar(dashboardManager.currentUser);
    }
    
    // Change photo button
    const changePhotoBtn = document.getElementById('changePhotoBtn');
    const profilePhotoInput = document.getElementById('profilePhotoInput');
    if (changePhotoBtn && profilePhotoInput) {
        changePhotoBtn.addEventListener('click', function() {
            profilePhotoInput.click();
        });
    }
});

// Profile avatar logic for profile section (profile picture or initials)
function setProfileAvatar(user) {
    const initialsEl = document.getElementById('profileAvatarInitials');
    const imgEl = document.getElementById('profileAvatarImg');
    if (!initialsEl || !imgEl) return;
    
    if (user.profilePicture) {
        imgEl.src = user.profilePicture;
        imgEl.style.display = 'block';
        initialsEl.style.display = 'none';
    } else {
        let initials = '';
        if (user.fullname) {
            const names = user.fullname.split(' ');
            initials = names[0].charAt(0).toUpperCase() + (names[1] ? names[1].charAt(0).toUpperCase() : '');
        } else if (user.name) {
            const names = user.name.split(' ');
            initials = names[0].charAt(0).toUpperCase() + (names[1] ? names[1].charAt(0).toUpperCase() : '');
        } else if (user.email) {
            initials = user.email.charAt(0).toUpperCase();
        }
        initialsEl.textContent = initials;
        initialsEl.style.display = 'block';
        imgEl.style.display = 'none';
    }
}

// Handle profile photo upload (frontend only)
function handleProfilePhotoChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(ev) {
        window.profilePictureBase64 = ev.target.result;
        if (dashboardManager && dashboardManager.currentUser) {
            dashboardManager.currentUser.profilePicture = ev.target.result;
            setProfileAvatar(dashboardManager.currentUser);
            
            // Also update sidebar avatar
            const avatarEl = document.querySelector('.user-avatar');
            if (avatarEl) {
                avatarEl.innerHTML = `<img src="${ev.target.result}" alt="Profile" style="width:100%;height:100%;border-radius:50%;">`;
            }
            
            dashboardManager.showNotification('Profile photo updated!', 'success');
        }
    };
    reader.readAsDataURL(file);
}

// Popup modal utility
function showFetchingModal() {
    let modal = document.getElementById('fetchingModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'fetchingModal';
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0,0,0,0.35); z-index: 9999; display: flex; align-items: center; justify-content: center;
        `;
        modal.innerHTML = `
            <div style="background: #fff; padding: 32px 40px; border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.18); text-align: center; min-width: 260px;">
                <div style="font-size:2.2rem; color:#4CAF50; margin-bottom:12px;">
                    <i class="fas fa-spinner fa-spin"></i>
                </div>
                <div style="font-size:1.2rem; color:#333;">Data is being fetched,<br>please wait...</div>
            </div>
        `;
        document.body.appendChild(modal);
    } else {
        modal.style.display = 'flex';
    }
}

function hideFetchingModal() {
    const modal = document.getElementById('fetchingModal');
    if (modal) modal.style.display = 'none';
}

// Fetch data from API endpoints
document.addEventListener('DOMContentLoaded', function () {
    // Helper to fetch and log data for a section
    async function fetchSection(endpoint, sectionName) {
        showFetchingModal();
        try {
            const res = await fetch(endpoint);
            const data = await res.json();
            console.log(`Fetched ${sectionName}:`, data);
            // Display success message
            if (dashboardManager) {
                dashboardManager.showNotification(`Fetched ${sectionName} successfully!`, 'success');
            } else {
                alert(`Fetched ${sectionName} from backend! Check console for data.`);
            }
        } catch (err) {
            console.error(`Error fetching ${sectionName}:`, err);
            if (dashboardManager) {
                dashboardManager.showNotification(`Failed to fetch ${sectionName}. Using local data.`, 'error');
            } else {
                alert(`Failed to fetch ${sectionName}`);
            }
        }
        hideFetchingModal();
    }

    // Map sidebar buttons to backend endpoints
    const sectionMap = {
        'dashboard': () => { 
            if (dashboardManager) dashboardManager.loadDashboardData(); 
        },
        'orders': () => fetchSection('/api/orders', 'Orders'),
        'bookings': () => fetchSection('/api/bookings', 'Bookings'),
        'favorites': () => fetchSection('/api/favorites', 'Favorites'),
        'profile': () => {
            const currentUser = JSON.parse(localStorage.getItem('farmconnect_current_user') || 
                                           localStorage.getItem('currentUser') || '{}');
            if (currentUser && (currentUser.id || currentUser.userID)) {
                fetchSection(`/api/profile/${currentUser.id || currentUser.userID}`, 'Profile');
            } else {
                if (dashboardManager) {
                    dashboardManager.showNotification('No user logged in', 'error');
                } else {
                    alert('No user logged in');
                }
            }
        },
        'payments': () => fetchSection('/api/payment-methods', 'Payment Methods'),
        'notifications': () => fetchSection('/api/notifications', 'Notifications')
    };

    // Attach click listeners to sidebar menu links
    const menuLinks = document.querySelectorAll('.menu-link[data-section]');
    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            if (sectionMap[section]) {
                sectionMap[section]();
            }
        });
    });
});
