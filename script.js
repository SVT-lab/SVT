// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    // Gestion du menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Fermer le menu mobile lorsqu'un lien est cliqué
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Gérer le défilement doux vers les sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation au défilement
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.feature-card, .level-card, .about-content, .hero-content').forEach(elem => {
        observer.observe(elem);
    });
    
    // Gestion des interrupteurs de visibilité (pour la partie admin)
    const visibilitySwitches = document.querySelectorAll('.visibility-switch');
    
    visibilitySwitches.forEach(switchElem => {
        switchElem.addEventListener('change', function() {
            const resourceId = this.getAttribute('data-resource-id');
            const isVisible = this.checked;
            
            // Code pour envoyer la mise à jour au serveur (à implémenter plus tard)
            console.log(`Resource ${resourceId} visibility set to ${isVisible}`);
            
            // Afficher une notification
            showNotification(isVisible ? 'Ressource maintenant visible' : 'Ressource masquée');
        });
    });
    
    // Fonction pour afficher une notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animer l'apparition
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Supprimer après 3 secondes
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Gestion du téléchargement de fichiers (pour la partie admin)
    const uploadForm = document.getElementById('upload-form');
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            
            // Simuler un téléchargement (à remplacer par un vrai code de téléchargement plus tard)
            showNotification('Téléchargement en cours...');
            
            setTimeout(() => {
                showNotification('Fichier téléchargé avec succès!');
                // Réinitialiser le formulaire
                this.reset();
            }, 2000);
        });
    }
    
    // Prévisualisation des fichiers avant téléchargement
    const fileInput = document.getElementById('file-input');
    const filePreview = document.getElementById('file-preview');
    
    if (fileInput && filePreview) {
        fileInput.addEventListener('change', function() {
            filePreview.innerHTML = '';
            
            if (this.files && this.files.length > 0) {
                for (let i = 0; i < this.files.length; i++) {
                    const file = this.files[i];
                    const fileItem = document.createElement('div');
                    fileItem.className = 'file-item';
                    
                    // Déterminer l'icône en fonction du type de fichier
                    let fileIcon = 'fa-file';
                    if (file.type.includes('pdf')) {
                        fileIcon = 'fa-file-pdf';
                    } else if (file.type.includes('image')) {
                        fileIcon = 'fa-file-image';
                    } else if (file.type.includes('word') || file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
                        fileIcon = 'fa-file-word';
                    } else if (file.type.includes('excel') || file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) {
                        fileIcon = 'fa-file-excel';
                    } else if (file.type.includes('video')) {
                        fileIcon = 'fa-file-video';
                    }
                    
                    fileItem.innerHTML = `
                        <i class="fas ${fileIcon}"></i>
                        <span>${file.name}</span>
                        <span class="file-size">${formatFileSize(file.size)}</span>
                    `;
                    
                    filePreview.appendChild(fileItem);
                }
            }
        });
    }
    
    // Fonction pour formater la taille du fichier
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    // Gestion des onglets dans le tableau de bord
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length && tabContents.length) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Désactiver tous les boutons et contenus
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Activer le bouton cliqué et le contenu correspondant
                const tabId = this.getAttribute('data-tab');
                this.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
}); 