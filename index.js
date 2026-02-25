 // JavaScript for Interactive Guitar
    const playString = (frequency, stringElement) => {
      // Get the mute button
      const muteBtn = document.getElementById("mute-btn");
      const isMuted = muteBtn?.textContent?.includes("Unmute");

      // Don't play sound if muted
      if (isMuted) return;

      // Create audio context for generating sound
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create oscillator (sound generator) and gain node (volume control)
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      // Set oscillator to triangle wave for guitar-like sound
      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(
        frequency,
        audioContext.currentTime,
      );

      // Create fade-in and fade-out effect for realistic guitar sound
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(
        0.3,
        audioContext.currentTime + 0.01,
      );
      gainNode.gain.exponentialRampToValueAtTime(
        0.1,
        audioContext.currentTime + 0.1,
      );
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 1.5,
      );

      // Connect oscillator to gain node to speakers
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Play the sound for 1.5 seconds
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1.5);

      // Visual feedback - make string light up when clicked
      stringElement.classList.add("string-active");
      setTimeout(() => {
        stringElement.classList.remove("string-active");
      }, 200);
    };

    // Add click listeners to all guitar strings
    const strings = document.querySelectorAll(".guitar-string");
    strings.forEach((string) => {
      string.addEventListener("click", (event) => {
        // Get the frequency from the data attribute
        const frequency = parseFloat(event.currentTarget.dataset.frequency || "0");
        playString(frequency, event.currentTarget);
      });
    });

    // Add click listeners to string info cards below the guitar
    const infoCards = document.querySelectorAll(".string-info-card");
    infoCards.forEach((card) => {
      card.addEventListener("click", (event) => {
        // Get the frequency from the card's data attribute
        const frequency = parseFloat(event.currentTarget.dataset.frequency || "0");
        
        // Find the matching guitar string and play it
        const string = document.querySelector(
          `.guitar-string[data-frequency="${frequency}"]`,
        );
        if (string) {
          playString(frequency, string);
        }
      });
    });

    // Mute/Unmute button functionality
    const muteBtn = document.getElementById("mute-btn");
    let isMuted = false;
    muteBtn?.addEventListener("click", () => {
      // Toggle mute state
      isMuted = !isMuted;
      if (muteBtn) {
        // Update button text based on mute state
        muteBtn.textContent = isMuted ? "🔇 " : "🔊 ";
      }
    });