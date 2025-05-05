document.addEventListener('DOMContentLoaded', () => {
  // DOM elementleri
  const form = document.getElementById('birthday-form');
  const birthdaysContainer = document.getElementById('birthdays-container');
  const searchInput = document.getElementById('search-input');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  const notification = document.getElementById('notification');

  // Tab değiştirme işlevi
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');
      
      // Aktif sekmesini değiştir
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // İçeriği göster/gizle
      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === tabId) {
          content.classList.add('active');
          
          // Doğum günleri sekmesi seçildiğinde, listeyi güncelle
          if (tabId === 'birthday-list') {
            loadBirthdays();
          }
        }
      });
    });
  });

  // Form gönderildiğinde yeni doğum günü ekle
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const surname = document.getElementById('surname').value.trim();
    const birthdate = document.getElementById('birthdate').value;
    
    if (!name || !surname || !birthdate) {
      showNotification('Lütfen tüm alanları doldurun.', true);
      return;
    }
    
    const birthdayData = {
      id: Date.now(), // Benzersiz ID
      name,
      surname,
      birthdate,
      addedAt: new Date().toISOString()
    };
    
    // Storage API ile mevcut doğum günleri listesini al ve güncelle
    chrome.storage.sync.get(['birthdays'], function(result) {
      const birthdays = result.birthdays || [];
      birthdays.push(birthdayData);
      
      // Güncellenmiş listeyi kaydet
      chrome.storage.sync.set({ birthdays }, function() {
        showNotification('Doğum günü başarıyla kaydedildi!');
        form.reset();
      });
    });
  });
  
  // Doğum günlerini yükle ve görüntüle
  function loadBirthdays(searchTerm = '') {
    chrome.storage.sync.get(['birthdays'], function(result) {
      let birthdays = result.birthdays || [];
      
      // Arama terimini uygula (eğer varsa)
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        birthdays = birthdays.filter(birthday => 
          birthday.name.toLowerCase().includes(searchLower) || 
          birthday.surname.toLowerCase().includes(searchLower)
        );
      }
      
      displayBirthdays(birthdays);
    });
  }
  
  // Doğum günlerini HTML olarak render et
  function displayBirthdays(birthdays) {
    if (birthdays.length === 0) {
      birthdaysContainer.innerHTML = '<div class="no-birthdays">Henüz kaydedilmiş doğum günü bulunmuyor.</div>';
      return;
    }
    
    // Doğum günlerini tarih sırasına göre sırala
    birthdays.sort((a, b) => {
      return new Date(a.birthdate) - new Date(b.birthdate);
    });
    
    // HTML oluştur
    birthdaysContainer.innerHTML = '';
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();
    
    birthdays.forEach(birthday => {
      const birthDate = new Date(birthday.birthdate);
      const birthMonth = birthDate.getMonth();
      const birthDay = birthDate.getDate();
      
      // Doğum gününün bu yıl için tarihini hesapla
      const thisYearBirthday = new Date(today.getFullYear(), birthMonth, birthDay);
      
      // Eğer bu yılki doğum günü geçtiyse, gelecek yılı hesapla
      if (thisYearBirthday < today) {
        thisYearBirthday.setFullYear(today.getFullYear() + 1);
      }
      
      // Bugünden kaç gün kaldığını hesapla
      const daysUntilBirthday = Math.ceil((thisYearBirthday - today) / (1000 * 60 * 60 * 24));
      
      // 30 gün veya daha az kaldıysa "upcoming" sınıfını ekle
      const isUpcoming = daysUntilBirthday <= 30;
      
      // Doğum tarihi formatı
      const formattedDate = new Date(birthday.birthdate).toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      
      // Kart HTML'i
      const cardHTML = `
        <div class="birthday-card ${isUpcoming ? 'upcoming' : ''}">
          <button class="delete-btn" data-id="${birthday.id}">✕</button>
          <h3>${birthday.name} ${birthday.surname}</h3>
          <p>Doğum Tarihi: ${formattedDate}</p>
          <p>${daysUntilBirthday === 0 ? 'Bugün doğum günü!' : 
               daysUntilBirthday === 1 ? 'Yarın doğum günü!' : 
               `Doğum gününe ${daysUntilBirthday} gün kaldı.`}</p>
        </div>
      `;
      
      birthdaysContainer.innerHTML += cardHTML;
    });
    
    // Silme düğmelerine click event listener ekle
    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', deleteHandler);
    });
  }
  
  // Doğum günü silme işleyicisi
  function deleteHandler(e) {
    const birthdayId = parseInt(e.target.getAttribute('data-id'));
    
    chrome.storage.sync.get(['birthdays'], function(result) {
      const birthdays = result.birthdays || [];
      const updatedBirthdays = birthdays.filter(birthday => birthday.id !== birthdayId);
      
      chrome.storage.sync.set({ birthdays: updatedBirthdays }, function() {
        showNotification('Doğum günü silindi.');
        loadBirthdays(searchInput.value.trim());
      });
    });
  }
  
  // Arama işlevselliği
  searchInput.addEventListener('input', (e) => {
    loadBirthdays(e.target.value.trim());
  });
  
  // Bildirim gösterme
  function showNotification(message, isError = false) {
    notification.textContent = message;
    notification.classList.remove('hidden');
    
    if (isError) {
      notification.classList.add('error');
    } else {
      notification.classList.remove('error');
    }
    
    // 3 saniye sonra bildirimi gizle
    setTimeout(() => {
      notification.classList.add('hidden');
    }, 3000);
  }
  
  // Sayfa yüklendiğinde ilk sekmede verileri göster
  loadBirthdays();
}); 