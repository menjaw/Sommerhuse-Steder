/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package facades;

import entity.Place;
import entity.Rating;
import entity.User;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;

/**
 *
 * @author danni
 */
public class RatingFacade implements IratingFacade {
    
    EntityManagerFactory emf;
    
    public RatingFacade(){
        throw new UnsupportedOperationException("Not supported yet.");
    }

    public RatingFacade(EntityManagerFactory emf) {
        this.emf = emf;
    }
    
    private EntityManager getEntityManager() {
        return emf.createEntityManager();
    }
    
    @Override
    public void setSingleRating(Rating rating, User user) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Rating getSingleRating(int id) {
        EntityManager em = emf.createEntityManager();
        Rating r = null;
        try {
            em.getTransaction().begin();
            r = em.find(Rating.class, (int) id);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
        return r;
    }
    
    public static void main(String[] args) {
        RatingFacade rf = new RatingFacade();
        
    }
    
}
